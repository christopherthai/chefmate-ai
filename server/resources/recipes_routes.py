from flask_restful import Resource
from flask import request, jsonify, make_response, Flask, session
from config import db
from models import Recipe, Ingredient, RecipeIngredients
import openai


class Recipes(Resource):
    """
    Represents a resource for managing recipes.
    """

    def get(self):
        """
        Retrieves all recipes and returns them as a JSON response.

        Returns:
            A JSON response containing all recipes.
        """
        recipes = Recipe.query.all()
        return make_response([recipe.to_dict() for recipe in recipes], 200)


class CreateRecipe(Resource):
    """
    Represents a resource for creating a new recipe.

    Methods:
        post(user_id): Create a new recipe for the specified user.
    """

    def post(self, user_id):
        """
        Create a new recipe for the specified user.

        Args:
            user_id (int): The ID of the user.

        Returns:
            Response: The response containing the created recipe data.

        Raises:
            ValueError: If the data provided is invalid.
        """

        data = request.get_json()

        if len(data.get("instructions")) < 10:
            return make_response(
                {"error": "Instructions must be at least 10 characters long"}, 400
            )

        # Check if the image URL is valid
        if not data.get("image_url").startswith(("http", "https")) or not data.get(
            "image_url"
        ).endswith((".png", ".jpg", ".jpeg")):
            return make_response({"error": "Invalid image URL"}, 400)

        existing_title = Recipe.query.filter_by(title=data.get("title")).first()

        if existing_title:
            return make_response({"error": "Recipe already exists"}, 400)

        ingredients_list = data.get("ingredients")

        try:
            new_recipe = Recipe(
                title=data.get("title"),
                instructions=data.get("instructions"),
                preparation_time=data.get("preparation_time"),
                serving_size=data.get("serving_size"),
                image_url=data.get("image_url"),
                user_id=user_id,
            )

            db.session.add(new_recipe)
            db.session.commit()

            # Add ingredients to the recipe
            for ingredient in ingredients_list:
                new_ingredient = Ingredient(
                    name=ingredient.get("name"),
                )

                db.session.add(new_ingredient)
                db.session.commit()

                recipe_ingredient = RecipeIngredients(
                    recipe_id=new_recipe.id,
                    ingredient_id=new_ingredient.id,
                    quantity=ingredient.get("quantity"),
                )

                db.session.add(recipe_ingredient)
                db.session.commit()

            return make_response(new_recipe.to_dict(), 201)
        except ValueError:
            return make_response({"error": "Invalid data"}, 400)


class UpdateRecipe(Resource):
    """
    Represents a resource for updating a recipe.

    Methods:
        patch(recipe_id, user_id): Update the specified recipe.
    """

    def patch(self, recipe_id, user_id):
        """
        Update the specified recipe.

        Args:
            recipe_id (int): The ID of the recipe to update.
            user_id(int): The ID of the user performing the update.

        Returns:
            Response: The response containing the updated recipe data.

        Raises:
            ValueError: If the data provided is invalid.
        """
        recipe = Recipe.query.filter_by(id=recipe_id).first()

        if not recipe:
            return make_response({"error": "Recipe not found"}, 404)

        if recipe.user_id != user_id:
            return make_response({"error": "Unauthorized"}, 401)

        data = request.get_json()

        if len(data.get("instructions")) < 10:
            return make_response(
                {"error": "Instructions must be at least 10 characters long"}, 400
            )

        ingredients_list = data.get("ingredients")

        try:

            existing_recipe = Recipe.query.filter_by(title=data.get("title")).first()

            if not existing_recipe:
                recipe.title = data.get("title")

            # Check if the image URL is valid
            if not data.get("image_url").startswith(("http", "https")) or not data.get(
                "image_url"
            ).endswith((".png", ".jpg", ".jpeg")):
                return make_response({"error": "Invalid image URL"}, 400)

            recipe.instructions = data.get("instructions")
            recipe.preparation_time = data.get("preparation_time")
            recipe.serving_size = data.get("serving_size")
            recipe.image_url = data.get("image_url")

            db.session.add(recipe)
            db.session.commit()

            recipe_ingredients = RecipeIngredients.query.filter_by(
                recipe_id=recipe.id
            ).all()

            # Delete recipe ingredients that are not in the updated list
            for recipe_ingredient in recipe_ingredients:
                if recipe_ingredient.ingredient_id not in [
                    ingredient.get("id") for ingredient in ingredients_list
                ]:
                    db.session.delete(recipe_ingredient)
                    db.session.commit()

            # Update or add new recipe ingredients
            for ingredient in ingredients_list:

                current_ingredient = Ingredient.query.filter_by(
                    id=ingredient.get("id")
                ).first()

                if not current_ingredient:
                    new_ingredient = Ingredient(
                        name=ingredient.get("name"),
                    )

                    db.session.add(new_ingredient)
                    db.session.commit()

                    recipe_ingredient = RecipeIngredients(
                        recipe_id=recipe.id,
                        ingredient_id=new_ingredient.id,
                        quantity=ingredient.get("quantity"),
                    )

                    db.session.add(recipe_ingredient)
                    db.session.commit()

                if current_ingredient:
                    current_ingredient.name = ingredient.get("name")
                    db.session.add(current_ingredient)
                    db.session.commit()

                    current_recipe_ingredient = RecipeIngredients.query.filter_by(
                        recipe_id=recipe.id, ingredient_id=current_ingredient.id
                    ).first()

                    if current_recipe_ingredient:
                        current_recipe_ingredient.quantity = ingredient.get("quantity")
                        db.session.add(current_recipe_ingredient)
                        db.session.commit()

            return make_response(recipe.to_dict(), 202)
        except ValueError:
            return make_response({"error": "Invalid data"}, 400)


class RecipesById(Resource):
    """
    Represents a resource for handling requests related to a specific recipe.

    Methods:
    - get: Retrieves a specific recipe by its ID.
    """

    def get(self, recipe_id):
        """
        Retrieves a specific recipe by its ID.

        Args:
        - recipe_id (int): The ID of the recipe to retrieve.

        Returns:
        - response (dict): The response containing the retrieved recipe
        """
        recipe = Recipe.query.filter_by(id=recipe_id).first()

        if not recipe:
            return make_response({"error": "Recipe not found"}, 404)

        return make_response(recipe.to_dict(), 200)


class RecipesByIdAndUserId(Resource):
    """
    Represents a resource for updating and deleting recipes by their ID and user ID.
    """

    def patch(self, recipe_id, user_id):
        """
        Updates a specific recipe by its ID.

        Args:
        - recipe_id (int): The ID of the recipe to update.
        - user_id (int): The ID of the user performing the update.

        Returns:
        - response (dict): The response containing the updated recipe
        """
        recipe = Recipe.query.filter_by(id=recipe_id).first()

        if not recipe:
            return make_response({"error": "Recipe not found"}, 404)

        if recipe.user_id != user_id:
            return make_response({"error": "Unauthorized"}, 401)

        try:
            data = request.get_json()

            for attr in data:
                setattr(recipe, attr, data.get(attr))

            db.session.add(recipe)
            db.session.commit()

            return make_response(recipe.to_dict(), 202)

        except ValueError:
            return make_response({"error": "Invalid data"}, 400)

    def delete(self, recipe_id, user_id):
        """
        Deletes a specific recipe by its ID.

        Args:
        - recipe_id (int): The ID of the recipe to delete.
        - user_id (int): The ID of the user performing the deletion.

        Returns:
        - response (dict): The response indicating the success of the deletion
        """
        recipe = Recipe.query.filter_by(id=recipe_id).first()

        if not recipe:
            return make_response({"error": "Recipe not found"}, 404)

        if recipe.user_id != user_id:
            return make_response({"error": "Unauthorized"}, 401)

        db.session.delete(recipe)
        db.session.commit()

        return make_response({}, 204)


class RecipesByIdIngredients(Resource):
    """
    Represents a resource for retrieving and adding ingredients for a recipe.

    Methods:
        - get(self, recipe_id): Retrieves the ingredients for the recipe.
        - post(self, recipe_id): Adds a new ingredient to the specified recipe.
    """

    def get(self, recipe_id):
        """
        Retrieves the ingredients for the specified recipe.

        Args:
            recipe_id (int): The ID of the recipe.

        Returns:
            A response containing the ingredients of the recipe in JSON format.
            If the recipe is not found, returns a 404 error response.
        """
        recipe = Recipe.query.filter_by(id=recipe_id).first()

        if not recipe:
            return make_response({"error": "Recipe not found"}, 404)

        return make_response(
            {
                "ingredients": [
                    ingredient.to_dict(rules=("-recipe_ingredients.recipe",))
                    for ingredient in recipe.ingredients
                ]
            },
            200,
        )

    def post(self, recipe_id):
        """
        Adds a new ingredient to the specified recipe.

        Args:
            recipe_id (int): The ID of the recipe.

        Returns:
            A response containing the newly added recipe ingredient in JSON format.
            If the recipe or ingredient is not found, returns a 404 error response.
            If the data is invalid, returns a 400 error response.
        """
        recipe = Recipe.query.filter_by(id=recipe_id).first()

        if not recipe:
            return make_response({"error": "Recipe not found"}, 404)

        data = request.get_json()

        ingredient = Ingredient.query.filter_by(id=data.get("ingredient_id")).first()

        if not ingredient:
            return make_response({"error": "Ingredient not found"}, 404)

        try:
            new_recipe_ingredient = RecipeIngredients(
                recipe_id=recipe_id,
                ingredient_id=data.get("ingredient_id"),
                quantity=data.get("quantity"),
            )

            db.session.add(new_recipe_ingredient)
            db.session.commit()

            return make_response(new_recipe_ingredient.to_dict(), 201)
        except ValueError:
            return make_response({"error": "Invalid data"}, 400)


class DeleteIngredientsByIdInRecipe(Resource):
    """
    Represents a resource for deleting an ingredient by its ID in a recipe.

    Methods:
        delete(recipe_id, ingredient_id): Deletes the specified
        ingredient from the recipe.
    """

    def delete(self, recipe_id, ingredient_id):
        """
        Delete a recipe ingredient.

        Args:
            recipe_id (int): The ID of the recipe.
            ingredient_id (int): The ID of the ingredient.

        Returns:
            flask.Response: The response object with status code 204
            if successful, or a response object with status code 404 if
            the recipe ingredient is not found.
        """
        recipe_ingredient = RecipeIngredients.query.filter_by(
            recipe_id=recipe_id, ingredient_id=ingredient_id
        ).first()

        if not recipe_ingredient:
            return make_response({"error": "Recipe ingredient not found"}, 404)

        db.session.delete(recipe_ingredient)
        db.session.commit()

        return make_response({}, 204)


class RecipesSuggestions(Resource):
    """
    Represents a resource for providing recipe suggestions based on ingredients.

    Methods:
        post: Retrieves recipe suggestions based on the provided ingredients.
    """

    def post(self):
        """
        Handle POST requests to retrieve recipes based on provided ingredients.

        Returns:
            A JSON response containing a list of recipes.
        """
        data = request.get_json()
        ingredients = data.get("ingredients")

        if not ingredients:
            return make_response({"error": "No ingredients provided"}, 400)

        response = openai.Completion.create(
            engine="text-davinci-002",
            prompt=f"Provide recipes using the following ingredients: {ingredients}",
            max_tokens=150,
        )

        recipes = response.choices[0].text.strip().split("\n\n")

        return jsonify({"recipes": recipes})


def initialize_routes(api):
    """
    Initializes the routes for the API.

    Args:
        api: The Flask-Restful API object.

    Returns:
        None
    """
    api.add_resource(Recipes, "/recipes", endpoint="recipes")
    api.add_resource(
        CreateRecipe, "/users/<int:user_id>/create-recipes", endpoint="create-recipe"
    )
    api.add_resource(
        UpdateRecipe,
        "/users/<int:user_id>/recipes/<int:recipe_id>/update-recipe",
        endpoint="update-recipe",
    )
    api.add_resource(
        RecipesById,
        "/recipes/<int:recipe_id>",
        endpoint="recipes-by-id",
    )

    api.add_resource(
        RecipesByIdAndUserId,
        "/recipes/<int:recipe_id>/users/<int:user_id>",
        endpoint="recipes-by-id-and-user-id",
    )
    api.add_resource(
        RecipesByIdIngredients,
        "/recipes/<int:recipe_id>/ingredients",
        endpoint="recipes-by-id-ingredients",
    )
    api.add_resource(
        DeleteIngredientsByIdInRecipe,
        "/recipes/<int:recipe_id>/ingredients/<int:ingredient_id>",
        endpoint="delete-ingredients-by-id-in-recipe",
    )
    api.add_resource(
        RecipesSuggestions, "/recipes/suggestions", endpoint="recipes-suggestions"
    )
