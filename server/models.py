from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db


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
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    last_login = db.Column(db.DateTime)

    # Define a relationship with the Recipe model and the SavedRecipes model
    recipes = db.relationship(
        "Recipe", back_populates="user", cascade="all, delete-orphan"
    )
    saved_recipes = db.relationship("SavedRecipes", back_populates="user")

    # Define an association proxy to access the recipes of a user
    user_saved_recipes = association_proxy("saved_recipes", "recipe")

    # Serialize rules to exclude the password_hash field and the user field from the Recipe and SavedRecipes models
    serialize_rules = (
        "-password_hash",
        "-recipes.user",
        "-saved_recipes.user",
    )

    @validates("username")
    def validate_username(self, _key, username):
        """
        Validates the username.

        Args:
            _key (str): The key of the attribute being validated.
            username (str): The username to be validated.

        Raises:
            AssertionError: If no username is provided or if the username is already in use.

        Returns:
            str: The validated username.
        """
        if not username:
            raise AssertionError("No username provided")
        if User.query.filter(User.username == username).first():
            raise AssertionError("Username is already in use")
        return username

    @validates("password_hash")
    def validate_password_hash(self, _key, password_hash):
        """
        Validates the password hash.

        Args:
            _key (str): The key associated with the password hash.
            password_hash (str): The password hash to be validated.

        Raises:
            AssertionError: If no password is provided.

        Returns:
            str: The validated password hash.
        """
        if not password_hash:
            raise AssertionError("No password provided")
        return password_hash

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


class Recipe(db.Model, SerializerMixin):
    """
    Represents a recipe in the application.

    Attributes:
        id (int): The unique identifier of the recipe.
        title (str): The title of the recipe.
        instructions (str): The instructions for preparing the recipe.
        preparation_time (int): The time required to prepare the recipe in minutes.
        serving_size (int): The number of servings the recipe yields.
        image_url (str): The URL of the image associated with the recipe.
        created_at (datetime): The timestamp when the recipe was created.

        user_id (int): The foreign key referencing the user who created the recipe.
        user (User): The user who created the recipe.
        recipe_ingredients (List[RecipeIngredients]): The ingredients required for the recipe.
        saved_recipes (List[SavedRecipes]): The users who have saved the recipe.
        ingredients (List[Ingredient]): The ingredients of the recipe.
        recipe_saved_users (List[User]): The users who have saved the recipe.

    """

    __tablename__ = "recipes"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    preparation_time = db.Column(db.Integer, nullable=False)
    serving_size = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # Define ForeignKey relationships with the User model
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    # Define a relationship with the user model, the RecipeIngredients model and the SavedRecipes model
    user = db.relationship("User", back_populates="recipes")
    recipe_ingredients = db.relationship("RecipeIngredients", back_populates="recipe")
    saved_recipes = db.relationship("SavedRecipes", back_populates="recipe")

    # Define an association proxy to access the ingredients of a recipe and the users who saved the recipe
    ingredients = association_proxy("recipe_ingredients", "ingredient")
    recipe_saved_users = association_proxy("saved_recipes", "user")

    # Serialize rules to exclude the user field from the User model, the recipe field from the SavedRecipes model and the recipe_ingredients field from the RecipeIngredients model
    serialize_rules = (
        "-user.recipes",
        "-saved_recipes.recipe",
        "-recipe_ingredients.recipe",
    )

    @validates("title")
    def validate_title(self, _key, title):
        """
        Validates the title of a recipe.

        Args:
            _key (str): The key of the attribute being validated.
            title (str): The title of the recipe.

        Raises:
            AssertionError: If the title is empty, already in use, or less than 3 characters long.

        Returns:
            str: The validated title.
        """
        if not title:
            raise AssertionError("No title provided")
        if Recipe.query.filter(Recipe.title == title).first():
            raise AssertionError("Title is already in use")
        if len(title) < 3:
            raise AssertionError("Title must be at least 3 characters long")
        return title

    @validates("instructions")
    def validate_instructions(self, _key, instructions):
        """
        Validates the instructions provided for a recipe.

        Args:
            _key (str): The key of the instructions attribute.
            instructions (str): The instructions for the recipe.

        Raises:
            AssertionError: If no instructions are provided or if the instructions are less than 10 characters long.

        Returns:
            str: The validated instructions.
        """
        if not instructions:
            raise AssertionError("No instructions provided")
        if len(instructions) < 10:
            raise AssertionError("Instructions must be at least 10 characters long")
        return instructions

    @validates("preparation_time")
    def validate_preparation_time(self, _key, preparation_time):
        """
        Validates the preparation time for a recipe.

        Args:
            _key (str): The name of the attribute being validated.
            preparation_time (int): The preparation time in minutes.

        Raises:
            AssertionError: If no preparation time is provided or if the preparation time is less than 1 minute.

        Returns:
            int: The validated preparation time.
        """
        if not preparation_time:
            raise AssertionError("No preparation time provided")
        if preparation_time < 1:
            raise AssertionError("Preparation time must be at least 1 minute")
        return preparation_time

    @validates("serving_size")
    def validate_serving_size(self, _key, serving_size):
        """
        Validates the serving size.

        Args:
            _key (str): The key of the attribute being validated.
            serving_size (int): The serving size to be validated.

        Raises:
            AssertionError: If no serving size is provided or if the serving size is less than 1.

        Returns:
            int: The validated serving size.
        """
        if not serving_size:
            raise AssertionError("No serving size provided")
        if serving_size < 1:
            raise AssertionError("Serving size must be at least 1")
        return serving_size

    @validates("image_url")
    def validate_image_url(self, _key, image_url):
        """
        Validates the image URL.

        Args:
            _key (str): The key of the attribute being validated.
            image_url (str): The image URL to be validated.

        Raises:
            AssertionError: If no image URL is provided or if the image URL is invalid.

        Returns:
            str: The validated image URL.
        """
        if not image_url:
            raise AssertionError("No image URL provided")
        if not image_url.startswith(("http", "https")) or not image_url.endswith(
            (".png", ".jpg", ".jpeg")
        ):
            raise AssertionError("Invalid image URL")
        return image_url

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

    def __repr__(self):
        return f"<Recipe {self.title}>"


class Ingredient(db.Model, SerializerMixin):
    __tablename__ = "ingredients"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    category = db.Column(db.String(120), nullable=False)

    # Define a relationship with the RecipeIngredients model
    recipe_ingredients = db.relationship(
        "RecipeIngredients", back_populates="ingredient"
    )

    # Define an association proxy to access the recipes of an ingredient
    recipes = association_proxy("recipe_ingredients", "recipe")

    # Serialize rules to exclude the recipe_ingredients field from the RecipeIngredients model
    serialize_rules = ("-recipe_ingredients.ingredient",)

    def __repr__(self):
        return f"<Ingredient {self.name}"


class RecipeIngredients(db.Model, SerializerMixin):
    __tablename__ = "recipe_ingredients"

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))
    ingredient_id = db.Column(db.Integer, db.ForeignKey("ingredients.id"))
    quantity = db.Column(db.String, nullable=False)

    # Define a relationship with the Recipe model and the Ingredient model
    recipe = db.relationship("Recipe", back_populates="recipe_ingredients")
    ingredient = db.relationship("Ingredient", back_populates="recipe_ingredients")

    # Serialize rules to exclude the recipe_ingredients field from the RecipeIngredients model and the ingredient field from the Ingredient model
    serialize_rules = (
        "-recipe.recipe_ingredients",
        "-ingredient.recipe_ingredients",
    )

    def __repr__(self):
        return (
            f"<RecipeIngredients {self.recipe_id} {self.ingredient_id} {self.quantity}>"
        )


class SavedRecipes(db.Model, SerializerMixin):
    __tablename__ = "saved_recipes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))
    saved_at = db.Column(db.DateTime, server_default=db.func.now())

    # Define a relationship with the User model and the Recipe model
    user = db.relationship("User", back_populates="saved_recipes")
    recipe = db.relationship("Recipe", back_populates="saved_recipes")

    # Serialize rules to exclude the saved_recipes field from the User model and the Recipe model
    serialize_rules = (
        "-user.saved_recipes",
        "-recipe.saved_recipes",
    )

    def __repr__(self):
        return f"<SavedRecipes {self.user_id} {self.recipe_id}>"
