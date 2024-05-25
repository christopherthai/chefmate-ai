from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db


class GroceryListItems(db.Model, SerializerMixin):
    """
    Represents an item in a grocery list.

    Attributes:
        id (int): The unique identifier of the grocery list item.
        grocery_list_id (int): The ID of the grocery list that this item belongs to.
        ingredient_id (int): The ID of the ingredient associated with this item.
        quantity (int): The quantity of the ingredient needed for this item.
        grocery_list (GroceryList): The grocery list that this item belongs to.
        ingredient (Ingredient): The ingredient associated with this item.
    """

    __tablename__ = "grocery_list_items"

    id = db.Column(db.Integer, primary_key=True)
    grocery_list_id = db.Column(
        db.Integer, db.ForeignKey("grocery_lists.id"), nullable=False
    )
    ingredient_id = db.Column(
        db.Integer, db.ForeignKey("ingredients.id"), nullable=False
    )
    quantity = db.Column(db.Integer, nullable=False)

    grocery_list = db.relationship("GroceryList", back_populates="grocery_list_items")
    ingredient = db.relationship("Ingredient", back_populates="grocery_list_items")

    serialize_rules = (
        "-grocery_list.grocery_list_items",
        "-ingredient.grocery_list_items",
    )

    @validates("quantity")
    def validate_quantity(self, _key, quantity):
        """
        Validates the quantity of a grocery list item.

        Args:
            _key (str): The key of the quantity attribute.
            quantity (int): The quantity value to be validated.

        Raises:
            AssertionError: If no quantity is provided.

        Returns:
            int: The validated quantity value.
        """
        if not quantity:
            raise AssertionError("No quantity provided")
        return quantity

    def __repr__(self):
        return f"<GroceryListItem {self.grocery_list_id}-{self.ingredient_id}>"
