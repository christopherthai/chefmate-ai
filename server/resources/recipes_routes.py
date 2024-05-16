from flask_restful import Resource
from flask import request, jsonify, make_response, Flask, session
from config import db
from models import Recipe, Ingredient, RecipeIngredients


class Recipes(Resource):
    def get(self):
        recipes = Recipe.query.all()
        return make_response({"recipes": [recipe.to_dict() for recipe in recipes]}, 200)

    def post(self):
        data = request.get_json()

        try:
            new_recipe = Recipe(
                title=data.get("title"),
                instructions=data.get("instructions"),
                preparation_time=data.get("preparation_time"),
                serving_size=data.get("serving_size"),
                image_url=data.get("image_url"),
            )

            db.session.add(new_recipe)
            db.session.commit()

            return make_response(new_recipe.to_dict(), 201)
        except ValueError:
            return make_response({"error": "Invalid data"}, 400)


class RecipesById(Resource):

    def get(self, recipe_id):
        recipe = Recipe.query.filter_by(id=recipe_id).first()

        if not recipe:
            return make_response({"error": "Recipe not found"}, 404)

        return make_response(recipe.to_dict(), 200)

    def patch(self, recipe_id):
        recipe = Recipe.query.filter_by(id=recipe_id).first()

        if not recipe:
            return make_response({"error": "Recipe not found"}, 404)

        try:
            data = request.get_json()

            for attr in data:
                setattr(recipe, attr, data.get(attr))

            db.session.add(recipe)
            db.session.commit()

            return make_response(recipe.to_dict(), 202)

        except ValueError:
            return make_response({"error": "Invalid data"}, 400)

    def delete(self, recipe_id):
        recipe = Recipe.query.filter_by(id=recipe_id).first()

        if not recipe:
            return make_response({"error": "Recipe not found"}, 404)

        db.session.delete(recipe)
        db.session.commit()

        return make_response({}, 204)


class RecipesByIdIngredients(Resource):
    def get(self, recipe_id):
        recipe = Recipe.query.filter_by(id=recipe_id).first()

        if not recipe:
            return make_response({"error": "Recipe not found"}, 404)

        return make_response(
            {
                "ingredients": [
                    ingredient.to_dict() for ingredient in recipe.ingredients
                ]
            },
            200,
        )

    def post(self, recipe_id):
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
    def delete(self, recipe_id, ingredient_id):
        recipe_ingredient = RecipeIngredients.query.filter_by(
            recipe_id=recipe_id, ingredient_id=ingredient_id
        ).first()

        if not recipe_ingredient:
            return make_response({"error": "Recipe ingredient not found"}, 404)

        db.session.delete(recipe_ingredient)
        db.session.commit()

        return make_response({}, 204)


def initialize_routes(api):
    api.add_resource(Recipes, "/recipes", endpoint="recipes")
    api.add_resource(RecipesById, "/recipes/<int:recipe_id>", endpoint="recipes-by-id")
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
