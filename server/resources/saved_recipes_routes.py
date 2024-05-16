from flask_restful import Resource
from flask import request, jsonify, make_response, Flask, session
from config import db
from models import User, Recipe, SavedRecipes


class SavedRecipesByUserId(Resource):
    """
    Represents an API resource for retrieving saved recipes by user ID.

    Methods:
        get(user_id): Retrieves the saved recipes for the specified user ID.
    """

    def get(self, user_id):
        """
        Retrieves the saved recipes for a specific user.

        Args:
            user_id (int): The ID of the user.

        Returns:
            A response containing the saved recipes for the user.
        """
        user = User.query.filter_by(id=user_id).first()

        if not user:
            return make_response({"error": "User not found"}, 404)

        saved_recipes = [
            {
                "saved_recipe": saved_recipe.to_dict(),
                "recipe": saved_recipe.recipe.to_dict(),
            }
            for saved_recipe in user.saved_recipes
        ]

        return make_response({"saved_recipes": saved_recipes}, 200)


class SavedRecipesByUserIdAndRecipeId(Resource):
    """
    Represents an API resource for managing saved recipes by user ID and recipe ID.

    Methods:
        post(user_id, recipe_id): Create a new saved recipe for the specified user and recipe.
        delete(user_id, recipe_id): Delete a saved recipe for the specified user and recipe.
    """

    def post(self, user_id, recipe_id):
        """
        Create a new saved recipe for a user.

        Args:
            user_id (int): The ID of the user.
            recipe_id (int): The ID of the recipe.

        Returns:
            A response object with the saved recipe data if successful, or an error response if unsuccessful.
        """
        user = User.query.filter_by(id=user_id).first()

        if not user:
            return make_response({"error": "User not found"}, 404)

        recipe = Recipe.query.filter_by(id=recipe_id).first()

        if not recipe:
            return make_response({"error": "Recipe not found"}, 404)

        try:
            new_saved_recipe = SavedRecipes(user_id=user_id, recipe_id=recipe_id)

            db.session.add(new_saved_recipe)
            db.session.commit()

            return make_response(new_saved_recipe.to_dict(), 201)
        except ValueError:
            return make_response({"error": "Invalid data"}, 400)

    def delete(self, user_id, recipe_id):
        """
        Delete a saved recipe for a specific user.

        Args:
            user_id (int): The ID of the user.
            recipe_id (int): The ID of the recipe.

        Returns:
            flask.Response: The response object with status code 204 if successful,
            or a response object with status code 404 if the saved recipe is not found.
        """
        saved_recipe = SavedRecipes.query.filter_by(
            user_id=user_id, recipe_id=recipe_id
        ).first()

        if not saved_recipe:
            return make_response({"error": "Saved recipe not found"}, 404)

        db.session.delete(saved_recipe)
        db.session.commit()

        return make_response({}, 204)


def initialize_routes(api):
    """
    Initializes the routes for the saved recipes API.

    Args:
        api: The Flask-Restful API object.

    Returns:
        None
    """
    api.add_resource(
        SavedRecipesByUserId,
        "/users/<int:user_id>/saved-recipes",
        endpoint="saved-recipes-by-user-id",
    )
    api.add_resource(
        SavedRecipesByUserIdAndRecipeId,
        "/users/<int:user_id>/saved-recipes/<int:recipe_id>",
        endpoint="saved-recipes-by-user-id-and-recipe-id",
    )
