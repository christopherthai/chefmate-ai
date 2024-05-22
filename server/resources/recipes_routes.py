from flask_restful import Resource
from flask import request, jsonify, make_response, Flask, session
from config import db
from models import Recipe, Ingredient, RecipeIngredients


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

        # ingredients_list is a list of dictionaries with keys: quantity, name
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
        - response (dict): The response containing the retrieved recipe or an error message.
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
        - response (dict): The response containing the updated recipe or an error message.
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
        - response (dict): The response indicating the success of the deletion or an error message.
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
    Represents a resource for retrieving and adding ingredients for a specific recipe.

    Methods:
        - get(self, recipe_id): Retrieves the ingredients for the specified recipe.
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
        delete(recipe_id, ingredient_id): Deletes the specified ingredient from the recipe.
    """

    def delete(self, recipe_id, ingredient_id):
        """
        Delete a recipe ingredient.

        Args:
            recipe_id (int): The ID of the recipe.
            ingredient_id (int): The ID of the ingredient.

        Returns:
            flask.Response: The response object with status code 204 if successful, or a response object with status code 404 if the recipe ingredient is not found.
        """
        recipe_ingredient = RecipeIngredients.query.filter_by(
            recipe_id=recipe_id, ingredient_id=ingredient_id
        ).first()

        if not recipe_ingredient:
            return make_response({"error": "Recipe ingredient not found"}, 404)

        db.session.delete(recipe_ingredient)
        db.session.commit()

        return make_response({}, 204)


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
