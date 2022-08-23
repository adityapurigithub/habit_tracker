# Habit-Tracker......

A basic Habit Tracking System. Tech Stack : HTML, CSS, JS, Node.js

## Technology Stack
- EJS
- SCSS
- NodeJS
- Express

## How-To-Use

- Clone this project
- Start by installing npm and mongoDB if you don't have them already.
- Run the Mongo Server.
- Navigate to Project Directory
    ```
    cd Habit-Tracker
    ```
- run following commands :
    ```
    npm install 
    ```
    ```
    npm start
    ```
## Basic-Features
- A welcome page for signing up or signing in.
- Home page includes all the habits you have added. You can Add or Delete any habit from here.
- Habits can be seen on daily and weekly basis.
   
## Directory Structure and flow of The Code
This code follows MVC pattern and hence everything is differentiated and well managed:

    Habit_tracker
        |-----assets
        |       |--- css
        |       |     |-- bootstrap.min.css
        |       |     |-- style.css
        |       |--- images
        |       |     |-- 1.jpeg
        |       |     └-- 2.jpeg..
        |------ config
        |         └--- mongoose.js
        |------ models
        |         └--- Habit.js
        └         └--- User.js 
        |------ routers
        |         └--- index.js
        |         └--- user.js
        |------ views
        |         |--- login.ejs
        |         |--- register.ejs
        |         |--- welcome.ejs
        |         |--- home.ejs
        |         └--- layout.ejs
        |------ Procfile
        |------ .gitignore
        |------ index.js
        |------ package.json
        |------ package-lock.json
        └------ README.md

Happy Coding :)
