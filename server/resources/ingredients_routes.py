from flask_restful import Resource
from flask import request, jsonify, make_response, Flask, session
from config import db
from models import Ingredient


class Ingredients(Resource):
    def get(self):
        ingredients = Ingredient.query.all()
        return make_response(
            {"ingredients": [ingredient.to_dict() for ingredient in ingredients]}, 200
        )

    def post(self):
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
    api.add_resource(Ingredients, "/ingredients", endpoint="ingredients")
