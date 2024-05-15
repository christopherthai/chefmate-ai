from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db


class RecipeIngredients(db.Model, SerializerMixin):
    """
    Represents the relationship between recipes and ingredients.

    This class defines the structure of the "recipe_ingredients" table in the database.
    It also provides methods for validating the quantity of an ingredient in a recipe.

    Attributes:
        id (int): The primary key of the recipe ingredient.
        recipe_id (int): The foreign key referencing the recipe.
        ingredient_id (int): The foreign key referencing the ingredient.
        quantity (str): The quantity of the ingredient in the recipe.

        recipe (Recipe): The relationship to the Recipe model.
        ingredient (Ingredient): The relationship to the Ingredient model.
    """

    __tablename__ = "recipe_ingredients"

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))
    ingredient_id = db.Column(db.Integer, db.ForeignKey("ingredients.id"))
    quantity = db.Column(db.String, nullable=False)

    # Define a relationship with the Recipe model and the Ingredient model
    recipe = db.relationship("Recipe", back_populates="recipe_ingredients")
    ingredient = db.relationship("Ingredient", back_populates="recipe_ingredients")

    # Serialize rules to exclude the recipe.recipe_ingredients and ingredient.recipe_ingredients fields
    serialize_rules = (
        "-recipe.recipe_ingredients",
        "-ingredient.recipe_ingredients",
    )

    @validates("quantity")
    def validate_quantity(self, _key, quantity):
        """
        Validates the quantity of an ingredient in a recipe.

        Args:
            _key (str): The key of the attribute being validated.
            quantity (str): The quantity of the ingredient in the recipe.

        Raises:
            AssertionError: If no quantity is provided.

        Returns:
            str: The validated quantity.
        """
        if not quantity:
            raise AssertionError("No quantity provided")
        return quantity

    def __repr__(self):
        return (
            f"<RecipeIngredients {self.recipe_id} {self.ingredient_id} {self.quantity}>"
        )
