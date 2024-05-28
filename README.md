# ChefMate AI

<!-- Headings -->

## Description

ChefMate AI simplifies culinary creativity, offering a dynamic platform where users can discover recipes shared by a vibrant community, find new dishes based on available ingredients with AI-powered suggestions, and manage their culinary collections.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Git](https://git-scm.com/).
- You have a [GitHub](https://github.com/) account.
- You have installed [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/get-npm).
- You have installed [Python](https://www.python.org/) and [pipenv](https://pipenv.pypa.io/en/latest/).
- You have installed [Honcho](https://honcho.readthedocs.io/en/latest/) (to manage Procfile-based applications).
- You have obtained the necessary API keys and secrets for your application (e.g., from OpenAI, Google, etc.).

## Getting Started

To get a local copy up and running, follow these steps.

### Front-end Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:your-username/chefmate-ai.git
   ```

2. Navigate to the front-end directory:

   ```bash
   cd chefmate-ai/client
   ```

3. Install npm packages:

   ```bash
   npm install
   ```

### Back-end Installation

1. Ensure you are in the root directory of the project.

2. Install pipenv and dependencies:

   ```bash
   pipenv install
   ```

3. Activate the virtual environment:

   ```bash
   pipenv shell
   ```

### Database Setup

1. Navigate to the data directory:

   ```bash
   cd server/data
   ```

2. Create a database file from the SQL file:

   ```bash
   sqlite3 your-database.db < backup_database.sql
   ```

3. Update the path to your database file in your environment variables:

   Ensure the `SQLALCHEMY_DATABASE_URI` variable in your `.env` file points to the absolute path of your database file. For example:

   ```dotenv
   SQLALCHEMY_DATABASE_URI=sqlite:////Users/.../your-database.db
   ```

### Environment Variables

1. Create a `.env` file in both the front-end (client folder) and back-end (server folder) directories.
2. Add your environment variables as required. Here is an example for both:

#### Front-end (client folder) `.env` Example

```dotenv
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

#### Back-end (server folder) `.env` Example

```dotenv
SQLALCHEMY_DATABASE_URI=sqlite:////absolute/path/to/your-database.db
JWT_SECRET_KEY=your-jwt-secret-key
OPENAI_API_KEY=your-openai-api-key
```

## Running the Application

1. Ensure you are in the root directory of the project.

2. Start the application using Honcho:

   ```bash
   honcho start -f Procfile.dev
   ```

## API Usage

To use the API, make requests to the endpoints defined in your backend. Example:

```bash
curl -X GET http://localhost:3000/api/recipes
```

Or using a tool like Postman, set the URL to your local server's API endpoint and make your desired requests.

## Additional Notes

- Ensure your SQLite database file is correctly set up before starting the back-end server.
- Adjust the configurations in your `.env` files based on your local environment and API keys.

## Wireframe

### Home Page

![HomePage](./planning/HomePage.png)

### Explore Recipe Page

![ExploreRecipe](./planning/ExploreRecipePage.png)

### Create Recipe Page

![CreateRecipe](./planning/CreateRecipePage.png)

### My Recipe Page

![MyRecipe](./planning/MyRecipePage.png)

### Recipe Details Page

![RecipeDetails](./planning/RecipeDetailsPage.png)

## User Stories

1. Users can enter ingredients they have at home into a search bar prominently featured on the homepage. The AI-driven system quickly analyzes these inputs and suggests a recipe that utilize these ingredients.
2. Users can view the AI-suggested recipe directly on the homepage, making it easy to see the recipe based on what they already have.
3. There is a dedicated page accessible from the main navigation labeled "Explore Recipes." On this page, users can browse through a comprehensive list of recipes shared by all users within the ChefMate AI community.
4. From the comprehensive recipe list on the Explore Recipes page, users can click on any recipe to view its detailed information. This action redirects them to the Recipe Details page, where they can see ingredients, cooking instructions, preparation time, and serving size.
5. Logged-in users can save recipes to their favorites on the recipe details page. For recipes they have created, they also have options to edit or delete them.
6. Users who are logged in can create a new recipe by navigating to a "Create Recipe" form, accessible from their user dashboard or via a direct link in the main navigation. Additionally, users can edit their existing recipes by selecting the "Edit" option on the Recipe Details page.
7. In the "My Recipes" page, accessible from the main navigation, users can view and manage all recipes they have created or saved. This page allows them to organize recipes into collections, edit, or delete them as needed.
8. Users can access their profile to update personal details such as, username, password and email address.
9. The "About" page is available to all users who want to learn more about the ChefMate AI application.

## React Components Tree Diagram

![ReactComponentsTree](./planning/ComponentTree.png)

## Database Schema

![Database](./planning/Database.png)

## Constraints

- Prevent the submission of empty fields in critical areas such as ingredient lists and cooking instructions
- Limit the length of the search input to prevent overload of the system
- Use foreign keys with on-delete and on-update cascades appropriately to maintain referential integrity between tables such as users, recipes, and ingredients
- Ensure that primary keys (e.g., user ID, recipe ID, ingredient ID) are unique and automatically generated by the system
- Users can only edit or delete their own recipes

## Validations

- Check for valid email format and unique username
- The username and password of the user must be non-empty
- Verify user permissions for any CRUD operation on sensitive data like editing or deleting a recipe
- Ensure that ingredient names and recipe titles do not contain invalid characters and meet specified length requirements

## API Routes

![API Routes](./planning/API-Routes.png)

## Example of a Response Structure

### GET /recipes

![ResponseStructure](./planning/ResponseStructure.png)

## React Routes

![ReactRoutes](./planning/ReactRoutes.png)

## Stretch Goals

1. On the Explore Recipes Page, users browse through the recipes using various filters, such as cuisine, popularity, or recent additions.
2. Users can share their favorite recipes or their own creations directly from the application to social media platforms. The system provides easy-to-use sharing buttons on each recipe page, facilitating a broader community interaction and enabling users to discuss their culinary experiences.
3. Integrate a smart cooking timer that users can activate directly from the recipe details page. The timer can be set automatically based on the cooking times provided in the recipe or adjusted manually by the user.
4. Users can leave comments and ratings on Recipe Detail Page.
5. Users can log in via Google Login for easy and secure access to their accounts
6. Users can add the ingredients from a recipe into a grocery list.

## Trello Board

![Trello Board](./planning/TrelloBoard.png)
