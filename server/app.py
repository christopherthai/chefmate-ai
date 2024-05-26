#!/usr/bin/env python3

# Importing the app and api objects from the config file
from config import app, api

# Importing the routes
from resources import (
    users_routes,
    recipes_routes,
    ingredients_routes,
    saved_recipes_routes,
    grocery_list_routes,
)

# Importing the routes from the resources folder
users_routes.initialize_routes(api)
recipes_routes.initialize_routes(api)
ingredients_routes.initialize_routes(api)
saved_recipes_routes.initialize_routes(api)
grocery_list_routes.initialize_routes(api)

# Running the app
if __name__ == "__main__":
    app.run(port=5555, debug=True)
