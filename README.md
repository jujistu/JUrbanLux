JUrbanLux https://jurbanlux.vercel.app README

Overview
This is an E-commerce website built using Next.js and TypeScript. It incorporates various technologies and libraries to create a secure and functional e-commerce platform. Below, you'll find an overview of the technologies and tools used in this project.

Technologies Used

Frontend
Next.js: Next.js is a React framework used for server-side rendering and building efficient web applications.
React: A JavaScript library for building user interfaces.
React-Toastify: This library is used for displaying notifications to the user.
React-Spinners: Provides loading state animations, improving the user experience during data fetching.
jsCookies: Used for storing the authentication token securely on the client side.
Stripe: A payment vendor integrated for handling payment processing.

Backend
MongoDB: MongoDB is used as the database to store product information, user data, and more.
JSON Web Tokens (JWT): JWT is used to securely transfer information over the web and for generating authentication tokens.
bcryptjs: This library is used for hashing and securely storing passwords in the database.
Joi: Joi is used for data validation, ensuring the integrity of user-submitted data.
Middleware: Middleware is implemented to determine whether a user is authenticated or not, adding a layer of security to protected routes.

Features
User authentication and authorization using JSON Web Tokens (JWT).
Secure password storage with bcryptjs.
Data validation with Joi.
Integration with Stripe for payment processing.
Notification system using React-Toastify.
Loading animations with React-Spinners.
Database storage using MongoDB.
Middleware for user authentication.
