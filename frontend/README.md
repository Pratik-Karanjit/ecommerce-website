Project Name: Laptop e-commerce

The project has multiple features like creating a new account locally, account verification, login functionality, buying laptops from shop by adding them to their cart, removing items from cart, admin panel and logout functionality. 

Table of Contents
1. Prerequisites
2. Getting Started
3. Configuration
4. Usage


1. Prerequisites

Node.js
MongoDB 
Git (for cloning the repository)


2. Getting Started

git clone https://github.com/Pratik-Karanjit/ecommerce-website.git

To run frontend code:
In terminal write these:
cd ecommerce-website
cd frontend 
npm install 
npm start


Before running backend code:
DO these:
Configuration

To run MongoDB, create a .env file inside of backend folder and paste these:

SECRET_KEY = mybackend
PORT = 8000
DB_URL=mongodb://0.0.0.0:27017/mybackend    
FROM_EMAIL=your_email@gmail.com
FROM_PASSWORD=your_app_password
EMAIL_HOST=smtp.gmail.com
BASE_URL = http://localhost:3000
If you switch tabs and .env file shows black lines, click on toggle auto-cloaking.

To run backend code:
In terminal write these:
cd ecommerce-website
cd backend 
npm install express
npm start


To set up app password, do the following:

 - Go to your Google Account settings.
   - In the "Security" section, find the "Signing in to Google" option.
   - Click on "App passwords" (you may need to enable 2-Step Verification if not already done).
   - Select "App" and "Other (custom name)".
   - Enter a name for your app (e.g., "My Ecommerce App").
   - Google will generate an App Password. Use this password in your `.env` file.
   - Restart vs code as the password often runs only after restarting.

# It is important to create app password for acquiring mail verification and accessing other features in this project

4. Usage

run command: npm start

You will be directed to Product page. The Admin panel will be displayed regardless of what role you enter with. As the project is created locally, the data cannot be fetched with my database so I have given permission to create products via Admin panel. 
After creating  the product, you can view it in products page and do the needfuls from admin panel. 



