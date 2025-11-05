# SEEKER - A job portal management App

Seeker is a simple job portal management app that gracefully help *Employers* to List a JOB and accept applications from *Job Seekers* 

## TABLES OF CONTENT
- [features](#features)
- [Technologies Used](#technologies-used)
- [set-up instructions](#setup-instructions)
- [How to Run](#how-to-run)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [How It Works](#how-it-works)
- [Future Improvements](#future-improvements)


## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing
- **validation**: , express-validator for input validation
- **Testing**: Postman
- **Deployment**: Render
- **Environment Management**: dotenv

## Setup Instructions

1. Make sure you have **Node.js** installed 
 - [download from nodejs.org](https://nodejs.org/)
2. Install MongoDB if you haven't done that already, create an account and cluster
 - 
3. Clone this repository 
 - git clone https://github.com/PelumiBG/Job-Board-App.git
   cd Job-Board-App
4. Install the required packages by running `npm install`

## How to Run

1. Create a `.env` file in the root directory with these variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

2. Start the MongoDB server

3. Run the application:
   ```
   node app.js
   ```

4. Open your browser and go to `http://localhost:5000/api`

## Project Structure

```
Hostify_App/
│
├── src/
│   ├── config/
│   │   └── db.js                       # Database connection setup (MongoDB)
│   │
│   ├── Controllers/
│   │   ├── applicationController.js      # Manages application
│   │   ├── adminController.js         # Handles admin control
│   │   ├── authController.js        # Manages role middleware
│   │   └── jobController.js          # Manages user-related logic
│   │
│   ├── Middleware/
│   │   ├── authMiddleware.js          # JWT verification and admin protection
│   │   ├── errorHandler.js      # Centralized error handling
│   │   └── validatorMiddleware.js     # Input validation (express-validator)
│   │
│   ├── Models/
│   │   ├── admin.js               # Admin schema
│   │   ├── application.js            # Application schema
│   │   ├── job.js           # Job schema
│   │   ├── user.js              # user shema
|   |
│   ├── Routes/
│   │   ├── adminRoute.js           # /api/admin
│   │   ├── applicationRoute.js          # /api/apply
│   │   ├── authRoute.js             # /api/auth
│   │   ├── candidateRoute.js            # /api/register/login
│   │   └── jobRoute.js              # /api/post
│   │
│   ├── Services/
│   │   └── userService.js           # handled the registration and login route
|   |
│   ├── app.js                          # Express app setup and middleware configuration(Entry Point)
│
├── .env                                # Environment variables
├── .gitignore                          # Ignored files for git
├── package.json                        # Project dependencies 
└── README.md                           # Project documentation
```