import { MongoClient, ServerApiVersion } from "mongodb";
import express from "express";
import bodyParser from "body-parser";
import expressSession from 'express-session';

const app = express();
const port = 3000;

// Serve up static files from the public folder
app.use(bodyParser.json());
app.use(express.static("./public"));

// Configure express to use express-session
app.use(
    expressSession({
        secret: 'cst2120 secret',
        cookie: { maxAge: 60000 },
        resave: false,
        saveUninitialized: true
    })
);

// Array that will store data about the users. 
// This is only an example - a database would be used for this in real code
let userArray = [];

// Set up application to handle GET requests 
app.get('/users', getUsers);// Returns all users
app.get('/checklogin', checklogin);// Checks to see if user is logged in.
app.get('/logout', logout);// Logs user out

// Set up application to handle POST requests
app.post('/login', login);// Logs the user in
app.post('/register', register);// Register a new user

// set up database
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: false },
});
const database = client.db("FocusON-X");
const usersCollection = database.collection("users");
const postsCollection = database.collection("posts");

app.get(`/M00872279`, async (request, response) => {
    try {
      const user = await usersCollection.find({}).toArray();
      console.log(user);
      response.send(user);
    } catch (error) {
      console.error(error);
      response.status(500).send("An error occurred while fetching data");
    }
});

app.post(`/M00872279/register`, async (request, response) => {

    const newUser = request.body;
    newUser.following = [];
    console.log(newUser)

  // Check to see if user exists.

  // Check to see if user has a username and password
  if(newUser.username === undefined || newUser.password === undefined){
    response.send({"error": true, message: "Missing username and/or password"});
  }
  else{
    try {
      const result = await usersCollection.insertOne(request.body);
      console.log(result);
      response.send({"message": "Data saved"});
    } catch (error) {
      console.error(error);
      response.status(500).send("An error occurred while saving data");
    }
  }
});

// GET /users. Returns all the users.
function getUsers(request, response){
    response.send(userArray);
}

// GET /checklogin. Checks to see if the user has logged in
function checklogin(request, response){
    if(!("username" in request.session))
        response.send('{"login": false}');
    else{
        response.send('{"login":true, "username": "' +
            request.session.username + '" }');
    }
}

// GET /logout. Logs the user out.
function logout(request, response){
    // Destroy session.
    request.session.destroy( err => {
        if(err)
            response.send('{"error": '+ JSON.stringify(err) + '}');
        else
            response.send('{"login":false}');
    });
}

/* POST /login. Checks the user's name and password. Logs them in if they match
    Expects a JavaScript object in the body:
    {name: "user name", password: "user password"} */
async function login(request, response){
    let usrlogin = request.body;
    console.log("Name: " + usrlogin.name + " password: " + usrlogin.password);

    // Look to see if we have a matching user in the database
    try {
        const user = await usersCollection.findOne({ username: usrlogin.name, password: usrlogin.password });
        if (user) {
            // Store details of logged in user
            request.session.username = user.username;
            response.send('{"login":true}');
        } else {
            response.send('{"login": false, "message":"Username or password incorrect."}');
        }
    } catch (error) {
        console.error(error);
        response.status(500).send("An error occurred while logging in");
    }
}

/* POST /register. Registers a new user.
    Expects a JavaScript object in the body:
        {name: "user name", password: "user password"} */
async function register(request, response){
    // Output the data sent to the server
    let newUser = request.body;
    console.log("Data received: " + JSON.stringify(newUser));

    // Should do some checking here!!

    // Add user to the database
    try {
        const result = await usersCollection.insertOne(newUser);
        console.log(result);
        response.send('{"registration":true, "username": "' + newUser.username + '" }');
    } catch (error) {
        console.error(error);
        response.status(500).send("An error occurred while registering user");
    }
}

// Start the app listening on port 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
