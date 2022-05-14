# project-group-enlightened-elephants
CS732/SE750 group repository for the Enlightened Elephants

## EE Wikipedia Forum

A forum board built with React, Express, Node and MongoDB


## Description 

This is an open forum for Wikipedia, which is a MERN-stack Web application that enables users to authenticate to post comments and discussions about Wikipedia contents, and to reply to these posts. We hope that the Wikipedia forum will help people gain more useful information and make users have a good experience.

### Roadmap

***

#### Registry and login

Each new users need to register their own accounts. This is the basic function for some other functions.

***

#### The precise search of Wikipedia articles
Search a wikipedia articles to view its content and discussion of other users, or join the discussion by yourself!

***

#### Corresponding View of a wikipedia article and post
A view with a wikipedia article and related discussion co-displaying to offer a good experience of exploring the konwledge behind the wikipedia article with other users.

***

#### Post and reply
Express your opinions about related wikipedia articles and comment to others.

***

#### Like posts
Support the opinion you like or you think important.

***

#### Delete a posts
Delete the post or comment that might be wrong.

***

### Technologies

As we use MERN stack to build the application, we build a frontend application with React and an express application with Express. Store data in a MongDB. Modify and add customized functions to the applications with Nodejs. Except React and Express, we can download other node moduals to enable more functions in both frontend and backend.

#### Frontend

* React Router. Navigate to different areas of the application via the URL path without actually making additional server requests.
* React hooks. Execute code at various points within a component's lifecycle.
* Ant Design. A UI library based on React.
* Jsencrypt. A good solution to RSA Javascript encryption.

#### Backend
* Express Router. Navigate to rescources in the server
* jsonwebtoken. Generate and verify the decrypted token containing the user information.

## Getting Started

### Preconditions

Install [MongoDB](https://www.mongodb.com/3) , [Express](https://expressjs.com/), [React](https://reactjs.org/) , and [Node.js](https://nodejs.org/en/)

### Installing

1. Clone this repo

       git clone https://github.com/henrispkl/MernBB.git



2. Go to the folder and install all dependencies

* Install dependencies for frontend

      cd frontend
      npm install

* Install dependencies for backend

      cd backend
      npm install

3. Build the project

      npm run build

### Executing

* Executing in production

      npm start
