from flask_restful import Resource
from flask import request, jsonify, make_response, Flask, session
from config import db
from models import Ingredient


class Ingredients(Resource):
    """
    Represents the Ingredients resource.

    This class handles GET and POST requests for the Ingredients resource.
    """

    def get(self):
        """
        Handles GET requests for the Ingredients resource.

        Returns:
            A response containing a list of all ingredients in the database.
        """
        ingredients = Ingredient.query.all()
        return make_response(
            {"ingredients": [ingredient.to_dict() for ingredient in ingredients]}, 200
        )

    def post(self):
        """
        Handles POST requests for the Ingredients resource.

        Returns:
            A response containing the newly created ingredient if successful,
            or an error response if the data is invalid.
        """
        data = request.get_json()

        try:
            new_ingredient = Ingredient(
                name=data.get("name"), category=data.get("category")
            )

            db.session.add(new_ingredient)
            db.session.commit()

            return make_response(new_ingredient.to_dict(), 201)
        except ValueError:
            return make_response({"error": "Invalid data"}, 400)


def initialize_routes(api):
    """
    Initializes the routes for the Ingredients resource.

    Args:
        api (flask_restful.Api): The Flask-Restful API object.

    Returns:
        None
    """
    api.add_resource(Ingredients, "/ingredients", endpoint="ingredients")
