# Node + React-Native Auth Workspace
This is a workspace for Node.js and React-Native. It includes a Node.js server and a React-Native app. 

The server is a simple REST API that uses JWT for authentication. It provides a basic user model with all the CRUD operations.
It also provides a basic reset password enpoint that sends an email to the user with a token to reset the password.

The app is a simple login screen that uses the server for authentication. It uses Expo routes for navigation and Route guards to protect the routes that require authentication.
