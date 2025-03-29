# Mortgage Application

## 🚀 Overview
This project allows users to apply for mortgages, calculates credit ratings, and manages mortgage data.

## 🛠 Setup Instructions

### 🔹 Backend (Django)
1. Install dependencies: `pip install -r requirements.txt`
2. Configure `.env` for MySQL credentials
3. Run migrations: `python manage.py migrate`
4. Start the server: `python manage.py runserver`

### 🔹 Frontend (React)
1. Install dependencies: `npm install`
2. Start the app: `npm start`

## ✅ API Endpoints
- **POST /api/mortgages/add/** → Add a new mortgage
- **GET /api/mortgages/** → Fetch all mortgages

## Configuration for .env file

- **DB_NAME=mortgage_db/** 
- **DB_USER="user"/** 
- **DB_PASSWORD="password"/** 
- **DB_HOST="host"/** 
- **DB_PORT=3306/** 

- **LOG_LEVEL=DEBUG/** 
- **LOG_FILE=mortgage_app.log/** 