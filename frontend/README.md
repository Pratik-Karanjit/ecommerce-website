Project Name: Laptop e-commerce

The project has multiple features like creating a new account locally, account verification, login functionality, buying laptops from shop by adding them to their cart, removing items from cart, admin panel and logout functionality. 

Table of Contents
1. Prerequisites
2. Getting Started
3. Configuration
4. Usage


1. Prerequisites

Node.js
MongoDB (running instance or connection string)
Git (for cloning the repository)


2. Getting Started

git clone https://github.com/Pratik-Karanjit/ecommerce-website.git
navigate to project folder


3. Configuration

To run MongoDB, add these info in .env file for backend

SECRET_KEY = mybackend
PORT = 8000
DB_URL=mongodb://0.0.0.0:27017/mybackend    
FROM_EMAIL=your_email@gmail.com
FROM_PASSWORD=your_app_password
EMAIL_HOST=smtp.gmail.com

To set up app password, do the following:

 - Go to your Google Account settings.
   - In the "Security" section, find the "Signing in to Google" option.
   - Click on "App passwords" (you may need to enable 2-Step Verification if not already done).
   - Select "App" and "Other (custom name)".
   - Enter a name for your app (e.g., "My Ecommerce App").
   - Google will generate an App Password. Use this password in your `.env` file.

# It is important to create app password for acquiring mail verification in this project

4. Usage

run command: npm start


