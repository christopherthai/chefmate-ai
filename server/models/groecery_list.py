from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db


class GroceryList(db.Model, SerializerMixin):
    """
    Represents a grocery list.

    Attributes:
        id (int): The unique identifier of the grocery list.
        user_id (int): The ID of the user who owns the grocery list.
        created_at (datetime): The timestamp when the grocery list was created.
        user (User): The user who owns the grocery list.
        grocery_list_items (list): The items in the grocery list.
    """

    __tablename__ = "grocery_lists"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship("User", back_populates="grocery_lists")
    grocery_list_items = db.relationship(
        "GroceryListItem", back_populates="grocery_list", cascade="all, delete-orphan"
    )

    serialize_rules = (
        "-user.grocery_lists",
        "-grocery_list_items.grocery_lists",
    )

    def __repr__(self):
        return f"<GroceryList {self.user_id}>"
