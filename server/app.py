#!/usr/bin/env python3

from flask import request, jsonify, make_response, Flask, session
from sqlalchemy.exc import IntegrityError


# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from datetime import datetime
from config import app, db, api

# Add your model imports
from models import User, Recipe, Ingredient, RecipeIngredients, SavedRecipes


class Register(Resource):
    def post(self):
        data = request.get_json()

        username = data.get("username")
        password = data.get("password")
        email = data.get("email")

        new_user = User(username=username, email=email)

        new_user.password_hash = password

        new_user.last_login = datetime.now()

        try:
            db.session.add(new_user)
            db.session.commit()

            session["user_id"] = new_user.id

            return make_response(new_user.to_dict(), 201)
        except IntegrityError:
            return {"error": "422 Unprocessable Entity"}, 422


api.add_resource(Register, "/users/register", endpoint="register")


class Login(Resource):
    def post(self):
        data = request.get_json()

        username = data.get("username")
        password = data.get("password")

        user = User.query.filter_by(username=username).first()

        if user and user.authenticate(password):

            user.last_login = datetime.now()

            db.session.add(user)
            db.session.commit()

            session["user_id"] = user.id
            return make_response(user.to_dict(), 200)
        else:
            return {"error": "401 Unauthorized"}, 401


api.add_resource(Login, "/users/login", endpoint="login")


class CheckSession(Resource):
    def get(self):
        if "user_id" in session:
            user = User.query.get(session["user_id"])
            return make_response(user.to_dict(), 200)
        else:
            return {"error": "401 Unauthorized"}, 401


api.add_resource(CheckSession, "/users/check-session", endpoint="check-session")


class Logout(Resource):
    def delete(self):

        if "user_id" in session:
            session["user_id"] = None
            return make_response({}, 204)

        return {"error": "401 Unauthorized"}, 401


api.add_resource(Logout, "/users/logout", endpoint="logout")


class UsersById(Resource):
    def get(self, user_id):
        user = User.query.filter_by(id=user_id).first()

        if not user:
            return make_response({"error": "User not found"}, 404)

        return make_response(user.to_dict(), 200)

    def patch(self, user_id):
        user = User.query.filter_by(id=user_id).first()

        if not user:
            return make_response({"error": "User not found"}, 404)

        try:
            data = request.get_json()

            for attr in data:
                setattr(user, attr, data.get(attr))

            db.session.add(user)
            db.session.commit()

            return make_response(user.to_dict(), 202)

        except ValueError:
            return make_response({"error": "Invalid data"}, 400)


api.add_resource(UsersById, "/users/<int:user_id>", endpoint="users-by-id")


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


api.add_resource(Recipes, "/recipes", endpoint="recipes")


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


api.add_resource(RecipesById, "/recipes/<int:recipe_id>", endpoint="recipes-by-id")


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


api.add_resource(Ingredients, "/ingredients", endpoint="ingredients")


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


api.add_resource(
    RecipesByIdIngredients,
    "/recipes/<int:recipe_id>/ingredients",
    endpoint="recipes-by-id-ingredients",
)


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


api.add_resource(
    DeleteIngredientsByIdInRecipe,
    "/recipes/<int:recipe_id>/ingredients/<int:ingredient_id>",
    endpoint="delete-ingredients-by-id-in-recipe",
)


if __name__ == "__main__":
    app.run(port=5555, debug=True)
