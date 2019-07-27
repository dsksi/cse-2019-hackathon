# set environment
import os
from dotenv import load_dotenv
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(dotenv_path):
    print("load from .env")
    load_dotenv(dotenv_path)

# create app instance
from littlelitter import create_app
app = create_app('production')  # TODO
