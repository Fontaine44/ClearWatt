# ClearWatt Backend  

## Overview  
This is the backend for ClearWatt, built using Flask. It provides API endpoints for managing application logic.

## Prerequisites
Ensure you have the following installed:  
- [Python 12+](https://www.python.org/). It may work with older versions but it has not been tested.


## Installation  

1. Move to the `backend` folder:
   ```sh
   cd backend
   ```

2. Install the required packages:
    ```sh
    pip install -r requirements.txt
    ```

## Running the API

### Development Mode  
Run the Flask server with debugging enabled:  
```sh
flask run --debug
```

### Production Mode
Run the Flask server in production (Linux or WSL only):  
```sh
gunicorn "app:create_app()"
```

## Database

The database is a simple SQLite instance. It is initialized every time the API is ran, so it acts as a non-persistent database.
