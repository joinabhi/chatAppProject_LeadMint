
# Chat Room

This is an online platform that enables users to communicate with each other in real time. 

## Functionalities

### 1- Account Creation
Users can easily create their account by signing up.

### 2- Login and Access
Once the account is created, the user can log in using their email and password to access the chat room.

## Features
Frontend- HTML, CSS, JavaScript

Backend- Node.js, Express

Database- MySQL

- Used Axios to fetch data from server, which offers different ways of making requests. such as- post, get, delete

- Used bcrypt library for password hashing

- Used JSON web token to securely transfer information over the web(b/w to parties), for authentication purpose.

- Used Socket.IO library for real-time web applications. It enables real-time, bi-directional communication between web clients and servers.

- Used MySQL database to store data in table.

- Implemented asynchronous operations using async/await.

- Using try/catch block for error handling

## APIs

- http://localhost:4600/user/add-signUp
  (New user registration)

- http://localhost:4600/user/add-signIn
  (Login into account)

- http://localhost:4600/user/add-user (Join new room)

- http://localhost:4600/user/get-user (Get all users)

- http://localhost:4600/user/delete-user/:id (Delete an user)

- http://localhost:4600/user/get-specificUser (Get information about an account to join another when he/she has available coins)

- http://localhost:4600/user/deduct-coins (Coins will deduce after joined new room)

## Important Built-in Functionalities

- For password hashing: bcrypt.hash(password, 10)

- For generate token: jwt.sign({email:email, userId:result}, process.env.SECRET_KEY)

- For password matching: bcrypt.compare(password, existingUser.password)

- For user verification: jwt.verify(token, SECRET_KEY)
