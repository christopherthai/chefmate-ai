from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db


class Review(db.Model, SerializerMixin):
    """
    Represents a review for a recipe.

    Attributes:
        id (int): The unique identifier of the review.
        user_id (int): The ID of the user who wrote the review.
        recipe_id (int): The ID of the recipe being reviewed.
        comment (str): The comment or feedback provided in the review.
        rating (int): The rating given to the recipe (between 1 and 5).
        created_at (datetime): The timestamp when the review was created.
        user (User): The user who wrote the review.
        recipe (Recipe): The recipe being reviewed.
    """

    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"), nullable=False)
    comment = db.Column(db.Text)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship("User", back_populates="reviews")
    recipe = db.relationship("Recipe", back_populates="reviews")

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
        return f"<Review {self.user_id}-{self.recipe_id}>"
