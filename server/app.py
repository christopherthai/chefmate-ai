#!/usr/bin/env python3

from flask import request, jsonify, make_response, Flask, session
from sqlalchemy.exc import IntegrityError


# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
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


if __name__ == "__main__":
    app.run(port=5555, debug=True)
