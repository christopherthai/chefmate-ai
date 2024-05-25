from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db


class Rating(db.Model, SerializerMixin):
    """
    Represents a rating given by a user to a recipe.

    Attributes:
        id (int): The unique identifier of the rating.
        user_id (int): The ID of the user who gave the rating.
        recipe_id (int): The ID of the recipe being rated.
        rating (int): The rating given by the user (between 1 and 5).
        created_at (datetime): The timestamp when the rating was created.
        user (User): The user who gave the rating.
        recipe (Recipe): The recipe being rated.
    """

    __tablename__ = "ratings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship("User", back_populates="ratings")
    recipe = db.relationship("Recipe", back_populates="ratings")

    serialize_rules = (
        "-user",
        "-recipe",
    )

    @validates("rating")
    def validate_rating(self, _key, rating):
        """
        Validates the rating value.

        Args:
            _key (str): The name of the attribute being validated.
            rating (int): The rating value to be validated.

        Raises:
            AssertionError: If no rating is provided or if the rating is not between 1 and 5.

        Returns:
            int: The validated rating value.
        """
        if not rating:
            raise AssertionError("No rating provided")
        if rating < 1 or rating > 5:
            raise AssertionError("Rating must be between 1 and 5")
        return rating

    def __repr__(self):
        return f"<Rating {self.user_id}-{self.recipe_id}>"
