from datetime import datetime
from flask_restful import Resource
from flask import request, jsonify, make_response, Flask, session
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity,
    unset_jwt_cookies,
)
from config import db
from models import User


class Register(Resource):
    """
    Resource class for user registration.

    This class handles the HTTP POST request for user registration.
    It receives user data in JSON format and creates a new user in the database.

    Attributes:
        None

    Methods:
        post(self): Handles the POST request for user registration.

    """

    def post(self):
        """
        Create a new user.

        This method creates a new user by extracting the username, password, and email from the request JSON data.
        It then creates a new User object with the extracted data and sets the password hash and last login time.
        The new user is added to the database and the session is updated with the user's ID.
        Finally, a response with the new user's data is returned.

        Returns:
            A response with the new user's data if the user is successfully created.
            An error response with status code 422 if there is an integrity error during the creation process.
            An error response with status code 400 if the username or email is already in use.
        """
        data = request.get_json()

        username = data.get("username")
        password = data.get("password")
        email = data.get("email")

        existing_user = User.query.filter_by(username=username).first()
        existing_email = User.query.filter_by(email=email).first()

        if existing_user is not None:
            return {"error": "Username is already in use"}, 400

        if existing_email is not None:
            return {"error": "Email address is already in use"}, 400

        new_user = User(username=username, email=email)

        new_user.password_hash = password

        new_user.last_login = datetime.now()

        try:
            db.session.add(new_user)
            db.session.commit()

            access_token = create_access_token(identity=new_user.id)

            return {"access_token": access_token, "user": new_user.to_dict()}, 201
        except IntegrityError:
            db.session.rollback()
            return {"error": "An error occurred during registration"}, 422


class Login(Resource):
    """
    Represents the login resource.

    This resource handles the authentication of users by verifying their credentials.

    Methods:
    - post: Authenticates the user based on the provided username and password.
    """

    def post(self):
        """
        Authenticate the user.

        This method handles the HTTP POST request to authenticate the user. It expects a JSON payload
        containing the username and password of the user. If the username and password are valid,
        the user is authenticated and added to the database. The user's last login timestamp is
        updated, and the user's ID is stored in the session. Finally, a JSON response with the user's
        details is returned.

        Returns:
            A JSON response with the user's details if the user is successfully created and authenticated.
            Otherwise, returns a JSON response with an error message and a 401 Unauthorized status code.
        """
        data = request.get_json()

        username = data.get("username")
        password = data.get("password")

        user = User.query.filter_by(username=username).first()

        if not user or not user.authenticate(password):
            return {"error": "Invalid credentials"}, 401

        if user and user.authenticate(password):

            user.last_login = datetime.now()

            db.session.add(user)
            db.session.commit()

            access_token = create_access_token(identity=user.id)

            return {"access_token": access_token, "user": user.to_dict()}, 200
        else:
            return {"error": "401 Unauthorized"}, 401


class CheckSession(Resource):
    """
    Represents a resource for checking user session.

    Methods:
        get: Retrieves the user associated with the current session.
    """

    @jwt_required()
    def get(self):
        """
        Retrieves the user associated with the current session.

        Returns:
            A response containing the user data if the user is authenticated.
            An empty response with a 401 status code if the user is not authenticated.
        """
        user_id = get_jwt_identity()

        user = User.query.filter(User.id == user_id).first()
        if user is None:
            return {"error": "User not found"}, 404

        return make_response(user.to_dict(), 200)


class Logout(Resource):
    """
    Represents the logout resource.

    This resource handles the deletion of the user session and returns a response
    with status code 204 if the user is successfully logged out. If the user is
    not authenticated, it returns a response with status code 401.

    Methods:
        delete: Deletes the user session and returns a response.

    """

    @jwt_required()
    def delete(self):
        """
        Deletes the user session and returns a response.

        Returns:
            A response with status code 204 if the user is successfully logged out.
            If the user is not authenticated, it returns a response with status code 401.

        """
        resp = make_response({}, 204)
        unset_jwt_cookies(resp)
        return resp


class UsersById(Resource):
    """
    Represents a resource for handling user operations by ID.

    Methods:
    - get(user_id): Retrieves a user by ID.
    - patch(user_id): Updates a user by ID.
    """

    def get(self, user_id):
        """
        Retrieves a user by ID.

        Args:
        - user_id: The ID of the user to retrieve.

        Returns:
        - If the user is found, returns the user data as a dictionary with a 200 status code.
        - If the user is not found, returns an error message with a 404 status code.
        """
        user = User.query.filter_by(id=user_id).first()

        if not user:
            return make_response({"error": "User not found"}, 404)

        return make_response(user.to_dict(), 200)

    def patch(self, user_id):
        """
        Updates a user by ID.

        Args:
        - user_id: The ID of the user to update.

        Returns:
        - If the user is found and the update is successful, returns the updated user data as a dictionary with a 202 status code.
        - If the user is not found, returns an error message with a 404 status code.
        - If the data provided for the update is invalid, returns an error message with a 400 status code.
        """
        user = User.query.filter_by(id=user_id).first()

        if not user:
            return make_response({"error": "User not found"}, 404)

        try:
            data = request.get_json()

            existing_username = User.query.filter_by(
                username=data.get("username")
            ).first()
            existing_email = User.query.filter_by(email=data.get("email")).first()

            if not existing_username:
                user.username = data.get("username")

            if not existing_email:
                user.email = data.get("email")

            password = data.get("password")

            if password is not None:
                user.password_hash = password

            db.session.add(user)
            db.session.commit()

            return make_response(user.to_dict(), 202)

        except ValueError:
            return make_response({"error": "Invalid data"}, 400)


class RecipesByUserId(Resource):
    """
    Resource class for retrieving recipes by user ID.

    Methods:
        get(self, user_id): Retrieves a user's recipes by user ID.
    """

    def get(self, user_id):
        """
        Retrieve a user's recipes by user ID.

        Args:
            user_id (int): The ID of the user.

        Returns:
            A response containing the user's recipes in JSON format.

        Raises:
            HTTPException: If the user is not found.

        """
        user = User.query.filter_by(id=user_id).first()

        if not user:
            return make_response({"error": "User not found"}, 404)

        return make_response(
            {"recipes": [recipe.to_dict() for recipe in user.recipes]},
            200,
        )


def initialize_routes(api):
    """
    Initializes the routes for the user resources.

    Args:
        api: The Flask-Restful API object.

    Returns:
        None
    """
    api.add_resource(Register, "/users/register", endpoint="register")
    api.add_resource(Login, "/users/login", endpoint="login")
    api.add_resource(CheckSession, "/users/check-session", endpoint="check-session")
    api.add_resource(Logout, "/users/logout", endpoint="logout")
    api.add_resource(UsersById, "/users/<int:user_id>", endpoint="users-by-id")
    api.add_resource(
        RecipesByUserId, "/users/<int:user_id>/recipes", endpoint="recipes-by-user-id"
    )
