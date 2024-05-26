from flask_restful import Resource
from flask import request, jsonify, make_response, Flask, session
from config import db
from models import GroceryList, GroceryListItems, Ingredient


class GroceryLists(Resource):
    """
    Represents the GroceryLists resource.

    This class handles GET
    requests for the GroceryLists resource.
    """

    def get(self, user_id):
        """
        Handles GET requests for the GroceryLists resource.

        Returns:
            A response containing a list of all grocery lists for the user.
        """
        grocery_lists = GroceryList.query.filter_by(user_id=user_id).all()

        grocery_lists_response = []

        for grocery_list in grocery_lists:
            grocery_list_items = GroceryListItems.query.filter_by(
                grocery_list_id=grocery_list.id
            ).all()

            format_grocery_list_items = [
                {
                    "id": item.id,
                    "grocery_list_id": item.grocery_list_id,
                    "ingredient_name": Ingredient.query.get(item.ingredient_id).name,
                    "ingredient_id": item.ingredient_id,
                    "quantity": item.quantity,
                }
                for item in grocery_list_items
            ]

            grocery_lists_response.append(
                {
                    "id": grocery_list.id,
                    "user_id": grocery_list.user_id,
                    "grocery_list_items": format_grocery_list_items,
                }
            )

        return make_response({"grocery_lists": grocery_lists_response}, 200)


def initialize_routes(api):
    """
    Initializes the routes for the GroceryLists resource.

    Args:
        api (flask_restful.Api): The Flask-Restful API object.

    Returns:
        None
    """
    api.add_resource(
        GroceryLists, "/grocery_lists/<int:user_id>", endpoint="grocery_lists"
    )
