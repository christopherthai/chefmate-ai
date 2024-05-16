from datetime import datetime
from flask_restful import Resource
from flask import request, jsonify, make_response, Flask, session
from sqlalchemy.exc import IntegrityError
from config import db
from models import User


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


class CheckSession(Resource):

    def get(self):

        user_id = session["user_id"]
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200

        return {}, 401


class Logout(Resource):
    def delete(self):

        if "user_id" in session:
            session["user_id"] = None
            return make_response({}, 204)

        return {"error": "401 Unauthorized"}, 401


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


class RecipesByUserId(Resource):
    def get(self, user_id):
        user = User.query.filter_by(id=user_id).first()

        if not user:
            return make_response({"error": "User not found"}, 404)

        return make_response(
            {"recipes": [recipe.to_dict() for recipe in user.recipes]},
            200,
        )


def initialize_routes(api):
    api.add_resource(Register, "/users/register", endpoint="register")
    api.add_resource(Login, "/users/login", endpoint="login")
    api.add_resource(CheckSession, "/users/check-session", endpoint="check-session")
    api.add_resource(Logout, "/users/logout", endpoint="logout")
    api.add_resource(UsersById, "/users/<int:user_id>", endpoint="users-by-id")
    api.add_resource(
        RecipesByUserId, "/users/<int:user_id>/recipes", endpoint="recipes-by-user-id"
    )
