from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db


class Comment(db.Model, SerializerMixin):
    """
    Represents a comment made by a user on a recipe.

    Attributes:
        id (int): The unique identifier for the comment.
        user_id (int): The foreign key referencing the user who made the comment.
        recipe_id (int): The foreign key referencing the recipe on which the comment was made.
        comment (str): The content of the comment.
        created_at (datetime): The timestamp when the comment was created.
        user (User): The user who made the comment.
        recipe (Recipe): The recipe on which the comment was made.
    """

    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"), nullable=False)
    comment = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship("User", back_populates="comments")
    recipe = db.relationship("Recipe", back_populates="comments")

    serialize_rules = (
        "-user",
        "-recipe",
    )

    @validates("comment")
    def validate_comment(self, _key, comment):
        """
        Validates the comment field.

        Args:
            _key (str): The name of the field being validated.
            comment (str): The comment to be validated.

        Raises:
            AssertionError: If no comment is provided.

        Returns:
            str: The validated comment.
        """
        if not comment:
            raise AssertionError("No comment provided")
        return comment

    def __repr__(self):
        return f"<Comment {self.user_id}-{self.recipe_id}>"
