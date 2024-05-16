from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db


class SavedRecipes(db.Model, SerializerMixin):
    """
    Represents a saved recipe by a user.

    Attributes:
        id (int): The unique identifier of the saved recipe.
        user_id (int): The foreign key referencing the user who saved the recipe.
        recipe_id (int): The foreign key referencing the saved recipe.
        saved_at (datetime): The timestamp when the recipe was saved.

        user (User): The relationship to the User model.
        recipe (Recipe): The relationship to the Recipe model.
    """

    __tablename__ = "saved_recipes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))
    saved_at = db.Column(db.DateTime, server_default=db.func.now())

    # Define a relationship with the User model and the Recipe model
    user = db.relationship("User", back_populates="saved_recipes")
    recipe = db.relationship("Recipe", back_populates="saved_recipes")

    # Serialize rules to avoid circular references
    serialize_rules = (
        "-user",
        "-recipe",
    )

    @validates("saved_at")
    def validate_saved_at(self, _key, saved_at):
        """
        Validates the 'saved_at' attribute.

        Args:
            _key (str): The name of the attribute being validated.
            saved_at: The value of the 'saved_at' attribute.

        Raises:
            AssertionError: If no 'saved_at' value is provided.

        Returns:
            The validated 'saved_at' value.
        """
        if not saved_at:
            raise AssertionError("No saved_at provided")
        return saved_at

    def __repr__(self):
        return f"<SavedRecipes {self.user_id} {self.recipe_id}>"
