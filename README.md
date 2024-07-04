# Online Chess

Online Chess, a web application built with React, Typescript, Socket.io, MongoDB and TailwindCSS. This project is a fully functional online multiplayer chess game.

## Table of Contents
- [Introduction](#Introduction)
- [Features](#Features)
- [Technologies Used](#Technologies-Used)
- [Getting Started](#Getting-Started)
- [Friends and Clubs](#Friends-and-Clubs)
- [Game GUI](#Game-GUI)
- [Websockets](#Websockets)
- [Responsive Design](#Responsive-Design)

## Introduction
The Online Chess is a multiplayer web application designed to showcase a game of chess. The project highlights wide range of features such as rating system, clubs, friends and in-game customizable skins.

## Features
- **Online Game:** Challenge other players to a game of chess, the results of the game would be saved in the user's game history.
- **Authentication:** Create an account or sign in via your email.
- **Game GUI:** +Configuration
- **Rating system:** Save desired items for later or add them to the shopping cart.
- **Friends:** Securely pay for your order using Stripe and view your order history.
- **Clubs:** Create, Update or Delete products with Admin Panel which is only available for users with admin rights.

## Technologies Used
- **React:** JavaScript library for building user interfaces.
- **Typescript:** Superset of JavaScript that adds static types.
- **MongoDB:**  Database for efficient data management.
- **Express:**  Minimalist and flexible web application framework for Node.js, used for building APIs, handling routes, and middleware.
- **Socket.io:**  Real-time communication library for enabling bidirectional communication between clients (e.g., browsers) and servers using WebSockets or other fallback mechanisms.
- **TailwindCSS:** Utility-first CSS framework for building stylish and responsive designs.

## Getting Started
To run the project locally, follow these steps:


1. **Clone the repository:** Clone this repository to your computer.
   ```bash
   git clone https://github.com/Vladocpro/Chess.git

2. **Navigate to the client directory of the project:**
   ```bash
   cd Chess\client

3. **Install dependencies for client side:**
   ```bash
   npm install

4. **Navigate to the server directory of the project:**
   ```bash
   cd ..\server

5. **Install dependencies for server side:**
   ```bash
   npm install

6. **Set up environment variables:** You need to create .env file in the project for both client and server directories. 

   Below are the necessary environment variables for client directory:
   ```bash
   VITE_SERVER_URL="Server URL which handles requests."
   ```
 
   Below are the necessary environment variables for server directory:
   ```bash
   MONGO_URL="The connection URL for your MongoDB database. It specifies the location and authentication details for the database server."
   PORT="A secret key used by NextAuth for signing and encrypting tokens. It enhances the security of user authentication."
   TOKEN_KEY="A secret key used for authentication and encrypting tokens."
   ```
   Make sure to add the `.env` file to the `.gitignore` list to avoid exposing your secret keys.


7. **The command to run the client and the server:**
   ```bash
   npm run dev

After completing these steps, your client application will be accessible at http://localhost:5173/. And server should be deployed with the port you define in the .env file.


## Friends and Clubs
Make your journey into the chess world. Make new friends who also enjoy playing game of chess. Challenge them to a game. Join different clubs. Compete with each other with the rating system.

## Game GUI
The game includes a graphical user interface that highlights available moves, displays move history, and shows captured pieces and remaining time for each of the players. Customize the appearance of pieces and the board with various skins.

## Websockets
WebSockets enhance the user experience by enabling real-time communication, making online chess competitions seamless. Additionally, they serve as a reliable notification system within the application.

## Responsive Design
The website is fully responsive, ensuring a seamless experience across various devices and screen sizes, thanks to the use of Tailwind CSS.


**You can check out the deployed version of this project [here](https://onlinechess-deploy.vercel.app).**
