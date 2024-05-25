from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt


class User(db.Model, SerializerMixin):
    """
    Represents a user in the system.

    Attributes:
        id (int): The unique identifier for the user.
        username (str): The username of the user.
        password_hash (str): The hashed password of the user.
        email (str): The email address of the user.
        created_at (datetime): The timestamp when the user was created.
        last_login (datetime): The timestamp of the user's last login.

        recipes (list): The list of recipes created by the user.
        saved_recipes (list): The list of recipes saved by the user.
        user_saved_recipes (list): The list of saved recipes associated with the user.
    """

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True)
    _password_hash = db.Column(db.String, nullable=True)
    email = db.Column(db.String, unique=True, nullable=False)
    google_id = db.Column(db.String(100), unique=True, nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    last_login = db.Column(db.DateTime)

    # Define a relationship with the Recipe model and the SavedRecipes model
    recipes = db.relationship(
        "Recipe", back_populates="user", cascade="all, delete-orphan"
    )
    saved_recipes = db.relationship(
        "SavedRecipes", back_populates="user", cascade="all, delete-orphan"
    )
    recipes = db.relationship("Recipe", back_populates="user")
    comments = db.relationship(
        "Comment", back_populates="user", cascade="all, delete-orphan"
    )
    ratings = db.relationship(
        "Rating", back_populates="user", cascade="all, delete-orphan"
    )
    grocery_lists = db.relationship(
        "GroceryList", back_populates="user", cascade="all, delete-orphan"
    )

    user_saved_recipes = association_proxy("saved_recipes", "recipe")
    user_comments = association_proxy("comments", "comment")
    user_ratings = association_proxy("ratings", "rating")
    user_grocery_lists = association_proxy("grocery_lists", "grocery_list")

    serialize_rules = (
        "-_password_hash",
        "-recipes.user",
        "-saved_recipes.user",
        "-recipes.user",
        "-comments.user",
        "-grocery_lists.user",
    )

    @hybrid_property
    def password_hash(self):
        """
        Returns the password hash for the user.

        Raises:
            AttributeError: If an attempt is made to view the password hash.

        Returns:
            str: The password hash.
        """
        raise AttributeError("Password hashes may not be viewed.")

    @password_hash.setter
    def password_hash(self, password):
        """
        Setter method for the password_hash attribute.

        Parameters:
        - password (str): The password to be hashed and stored.

        Returns:
        - None
        """
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        """
        Authenticates the user by comparing the provided password with the stored password hash.

        Parameters:
        - password (str): The password to be authenticated.

        Returns:
        - bool: True if the password is correct, False otherwise.
        """
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))

    @validates("username")
    def validate_username(self, _key, username):
        """
        Validates the username.

        Args:
            _key (str): The key of the attribute being validated.
            username (str): The username to be validated.

        Raises:
            AssertionError: If the username is already in use.

        Returns:
            str: The validated username.
        """
        if User.query.filter(User.username == username).first():
            raise AssertionError("Username is already in use")
        return username

    @validates("email")
    def validate_email(self, _key, email):
        """
        Validates the email address.

        Args:
            _key (str): The key associated with the email attribute.
            email (str): The email address to be validated.

        Raises:
            AssertionError: If no email is provided, if the email is already in use, or if the email address is invalid.

        Returns:
            str: The validated email address.
        """
        if not email:
            raise AssertionError("No email provided")
        if User.query.filter(User.email == email).first():
            raise AssertionError("Email is already in use")
        if "@" not in email:
            raise AssertionError("Invalid email address")
        return email

    @validates("created_at")
    def validate_created_at(self, _key, created_at):
        """
        Validates the 'created_at' attribute.

        Args:
            _key (str): The name of the attribute being validated.
            created_at: The value of the 'created_at' attribute.

        Raises:
            AssertionError: If no 'created_at' value is provided.

        Returns:
            The validated 'created_at' value.
        """
        if not created_at:
            raise AssertionError("No created_at provided")
        return created_at

    @validates("last_login")
    def validate_last_login(self, _key, last_login):
        """
        Validates the last_login field.

        Args:
            _key (str): The name of the field being validated.
            last_login (datetime): The value of the last_login field.

        Raises:
            AssertionError: If no last_login is provided.

        Returns:
            datetime: The validated last_login value.
        """
        if not last_login:
            raise AssertionError("No last_login provided")
        return last_login

    def __repr__(self):
        return f"<User {self.username} {self.email}>"
