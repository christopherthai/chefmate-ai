# Standard library imports

# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from sqlalchemy import MetaData
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
import openai
import os


load_dotenv()

# Instantiate app, set attributes
app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("SQLALCHEMY_DATABASE_URI")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

# Define metadata, instantiate db
metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

bcrypt = Bcrypt(app)

# Instantiate REST API
api = Api(app)

# Instantiate JWT Manager
jwt = JWTManager(app)

# Instantiate CORS
CORS(app)

# Instantiate OpenAI API
openai.api_key = app.config["OPENAI_API_KEY"]
