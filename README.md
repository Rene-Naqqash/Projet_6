# Projet_6

The back-end of the website "Mon Vieux Grimoire" developed by René NAQQASH

---

## Table of Contents
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [Technologies Used](#technologies-used)

---

## Getting Started

Follow these instructions to set up and run the back-end server.

### Prerequisites

- Ensure that you have [Node.js](https://nodejs.org/) installed on your machine.
- You may also want to use [Nodemon](https://www.npmjs.com/package/nodemon) for easier server restarts during development.

---

## Installation

1. Clone the repository to your local machine:
   ```
   git clone https://github.com/Rene-Naqqash/Projet_6.git
   ```
2. Navigate to the project directory:
    ```
    cd your-repo-name
    ```
3. Install the required dependencies:

    ```
    npm install
    ```
---

## Running the Server

To start the back-end server, follow these steps:

1. Create an Environment File
In the root directory, create a `.env` file.

2. Add Environment Variables
Copy the following code and paste it into the `.env` file:
```
MONGO_URL="mongodb+srv://rene-p6:DevWeb-Rene-P6@clusterrene.ze01v.mongodb.net/db-p6?retryWrites=true&w=majority&appName=ClusterRene"
```
3. Start the Server
Use one of the following commands to start the server:
```
npm start
```
or, if you prefer using nodemon:
```
nodemon server
```
Your server should now be up and running!
after that you can run your front-end Server.

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express** - Fast, unopinionated, minimalist web framework for Node.js
- **MongoDB** - NoSQL database
- **Nodemon** - Tool that helps develop Node.js applications by automatically restarting the server on file changes

