from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db


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
        reviews = (List[Review]): The reviews made on the recipe.
        ingredients (List[Ingredient]): The ingredients of the recipe.
        recipe_saved_users (List[User]): The users who have saved the recipe.
        recipe_reviews (List[Review]): The reviews made on the recipe.


    """

    __tablename__ = "recipes"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False, unique=True)
    instructions = db.Column(db.Text, nullable=False)
    preparation_time = db.Column(db.Integer, nullable=False)
    serving_size = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # Define ForeignKey relationships with the User model
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    user = db.relationship("User", back_populates="recipes")
    recipe_ingredients = db.relationship(
        "RecipeIngredients", back_populates="recipe", cascade="all, delete-orphan"
    )
    saved_recipes = db.relationship(
        "SavedRecipes", back_populates="recipe", cascade="all, delete-orphan"
    )
    reviews = db.relationship(
        "Review", back_populates="recipe", cascade="all, delete-orphan"
    )

    ingredients = association_proxy("recipe_ingredients", "ingredient")
    recipe_saved_users = association_proxy("saved_recipes", "user")
    recipe_comments = association_proxy("comments", "comment")
    recipe_ratings = association_proxy("ratings", "rating")

    serialize_rules = (
        "-user.recipes",
        "-saved_recipes.recipe",
        "-recipe_ingredients.recipe",
        "-reviews.recipe",
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
