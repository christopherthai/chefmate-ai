from flask_restful import Resource
from flask import request, jsonify, make_response, Flask, session
from config import db
from models import GroceryList, GroceryListItems, Ingredient, RecipeIngredients


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


class AddItemsToGroceryList(Resource):
    """
    Represents a resource for adding items to the grocery list.
    """

    def patch(self, user_id):
        """
        Handles PATCH requests for the GroceryLists resource.

        Args:
            user_id (int): The ID of the user.

        Returns:
            A response containing a message indicating that the items have been added to the grocery list.
        """

        data = request.get_json()

        # ingredient_ids is a list of ingredient ids
        ingredient_ids = data.get("ingredient_ids")

        grocery_list = GroceryList.query.filter_by(user_id=user_id).first()

        if grocery_list is None:
            grocery_list = GroceryList(user_id=user_id)
            db.session.add(grocery_list)
            db.session.commit()

        grocery_list_items = GroceryListItems.query.filter_by(
            grocery_list_id=grocery_list.id
        ).all()

        for ingredient_id in ingredient_ids:

            if not any(
                item.ingredient_id == ingredient_id for item in grocery_list_items
            ):
                grocery_list_item = GroceryListItems(
                    grocery_list_id=grocery_list.id,
                    ingredient_id=ingredient_id,
                    quantity=1,
                )
                db.session.add(grocery_list_item)
                db.session.commit()

            if any(item.ingredient_id == ingredient_id for item in grocery_list_items):
                grocery_list_item = GroceryListItems.query.filter_by(
                    grocery_list_id=grocery_list.id, ingredient_id=ingredient_id
                ).first()
                grocery_list_item.quantity += 1
                db.session.commit()

        return make_response({"message": "Items added to grocery list"}, 200)


def initialize_routes(api):
    """
    Initializes the routes for the GroceryLists resource.

    Args:
        api (flask_restful.Api): The Flask-Restful API object.

    Returns:
        None
    """
    api.add_resource(
        GroceryLists, "/grocery-lists/<int:user_id>", endpoint="grocery_lists"
    )
    api.add_resource(
        AddItemsToGroceryList,
        "/grocery-lists/<int:user_id>/add_items",
        endpoint="add_items_to_grocery_list",
    )
