from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())
    last_login = db.Column(db.DateTime, default=db.func.now())

    # Define a relationship with the Recipe model and the SavedRecipes model
    recipes = db.relationship("Recipe", back_populates="user")
    saved_recipes = db.relationship("SavedRecipes", back_populates="user")

    def __repr__(self):
        return f"<User {self.username} {self.email}>"


class Recipe(db.Model, SerializerMixin):
    __tablename__ = "recipes"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    preparation_time = db.Column(db.String(120), nullable=False)
    serving_size = db.Column(db.String(120), nullable=False)
    image_url = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())

    # Define ForeignKey relationships with the User model
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    # Define a relationship with the user model, the RecipeIngredients model and the SavedRecipes model
    user = db.relationship("User", back_populates="recipes")
    recipe_ingredients = db.relationship("RecipeIngredients", back_populates="recipe")
    saved_recipes = db.relationship("SavedRecipes", back_populates="recipe")

    def __repr__(self):
        return f"<Recipe {self.title}>"


class Ingredient(db.Model, SerializerMixin):
    __tablename__ = "ingredients"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    category = db.Column(db.String(120), nullable=False)

    recipe_ingredients = db.relationship(
        "RecipeIngredients", back_populates="ingredient"
    )

    def __repr__(self):
        return f"<Ingredient {self.name}"


class RecipeIngredients(db.Model, SerializerMixin):
    __tablename__ = "recipe_ingredients"

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))
    ingredient_id = db.Column(db.Integer, db.ForeignKey("ingredients.id"))
    quantity = db.Column(db.String(120), nullable=False)

    recipe = db.relationship("Recipe", back_populates="recipe_ingredients")
    ingredient = db.relationship("Ingredient", back_populates="recipe_ingredients")

    def __repr__(self):
        return (
            f"<RecipeIngredients {self.recipe_id} {self.ingredient_id} {self.quantity}>"
        )


class SavedRecipes(db.Model, SerializerMixin):
    __tablename__ = "saved_recipes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))
    saved_at = db.Column(db.DateTime, default=db.func.now())

    user = db.relationship("User", back_populates="saved_recipes")
    recipe = db.relationship("Recipe", back_populates="saved_recipes")

    def __repr__(self):
        return f"<SavedRecipes {self.user_id} {self.recipe_id}>"
