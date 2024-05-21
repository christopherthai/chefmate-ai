from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db


class Ingredient(db.Model, SerializerMixin):
    """
    Represents an ingredient in the system.

    Attributes:
        id (int): The unique identifier of the ingredient.
        name (str): The name of the ingredient.
        category (str): The category of the ingredient.

        recipe_ingredients (Relationship): The relationship with the RecipeIngredients model.
        recipes (AssociationProxy): The association proxy to access the recipes of an ingredient.
        serialize_rules (tuple): The rules to exclude the recipe_ingredients field from the RecipeIngredients model.
    """

    __tablename__ = "ingredients"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    category = db.Column(db.String(150))

    # Define a relationship with the RecipeIngredients model
    recipe_ingredients = db.relationship(
        "RecipeIngredients", back_populates="ingredient"
    )

    # Define an association proxy to access the recipes of an ingredient
    recipes = association_proxy("recipe_ingredients", "recipe")

    # Serialize rules to exclude the ingredient field from the RecipeIngredients model
    serialize_rules = ("-recipe_ingredients.ingredient",)

    @validates("name")
    def validate_name(self, _key, name):
        """
        Validates the name of an ingredient.

        Args:
            _key (str): The key of the attribute being validated.
            name (str): The name of the ingredient.

        Raises:
            AssertionError: If no name is provided.

        Returns:
            str: The validated name.
        """
        if not name:
            raise AssertionError("No name provided")
        return name

    def __repr__(self):
        return f"<Ingredient {self.name}"
