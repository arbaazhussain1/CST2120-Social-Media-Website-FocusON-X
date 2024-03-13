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


//set up database
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
  
  app.post(`/M00872279/register`, async (req, response) => {
    let userObj = {};   // Initialize userObj as an empty object

    userObj.firstname = req.body.firstname;
    userObj.lastname = req.body.lastname
    userObj.username = req.body.username;
    userObj.email = req.body.email;
    userObj.password = req.body.password;
      // const newUser = request.body;
      // newUser.following = [];
       console.log(userObj)

    //Check to see if user exists.

    // //Check to see if user has a username and password
    // if(newUser.username === undefined || newUser.password === undefined){
    //   response.send({"error": true, message: "Missing username and/or password"});
    // }
    // else{
      try {
        const result = await usersCollection.insertOne(req.body);
        console.log(result);
        response.send({"message": "Data saved"});
      } catch (error) {
        console.error(error);
        response.status(500).send("An error occurred while saving data");
      }
    
  });
  
  

// async function main(){
//     /**
//      * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
//      * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
//      */

//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();

//         // Make the appropriate DB calls
//         await listDatabases(client);

//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

// main().catch(console.error);

// async function listDatabases(client){
//     const databasesList = await client.db().admin().listDatabases();

//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };



//post request
// app.post('/M00872279', (req, res) => {
//     console.log(req.body);
//     res.send({"message": " data recieved"});

// });

//get request
// app.get('/M00872279', (req, res) => {
//     res.send({"message": "  data retrieved"});
// });


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



// Sign-up page Validations
// Function to validate and register user input
// app.post('/M00872279/register', (req, res) => {
//   // Regular expression for email validation
//   // const re =
//   //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   // // Regular expression for password validation
//   // var pas = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
//   // // Object to store user input data
//   let userObj = {};
//   // Retrieve user input values from HTML input elements
//   userObj.firstname = req.body.firstname;
//   userObj.lastname = req.body.lastname
//   userObj.username = req.body.username;
//   userObj.email = req.body.email;
//   userObj.password = req.body.password;
//   // userObj.topScore = 0; // Initialize top score to 0

//   // Check if any of the required fields are empty
//   // if (
//   //   userObj.username == "" ||
//   //   userObj.firstname == "" ||
//   //   userObj.lastname == "" ||
//   //   userObj.email == "" ||
//   //   userObj.password == ""
//   // ) {
//   //   // document.getElementById("validation").innerHTML =
//   //   //   "Enter All the Textfields.";
//   // } else if (re.test(userObj.email) == false) {
//   //   // Check if the email format is incorrect
//   //   // document.getElementById("validationRed").innerHTML =
//   //   //   "Incorrect Email Format.";
//   // } else if (
//   //   userObj.password.length < 8 ||
//   //   pas.test(userObj.password) == false
//   // ) {
//   //   // Check if the password length is less than 8 characters or does not meet the specified criteria
//   //   // document.getElementById("validationRed").innerHTML =
//   //   //   "Password must have Special Characters/Numbers, and Required to be 8 Characters long.";
//   // } else {
//   //   // Check if the username or email already exists in the users array
//   //   let users = JSON.parse(localStorage.getItem("users")) || [];
//   //   if (
//   //     users.some(
//   //       (u) => u.username === userObj.username || u.email === userObj.email
//   //     )
//   //   ) {
//   //     // Check if the username or email already exists
//   //     // document.getElementById("validationRed").innerHTML =
//   //     //   "Username or Email already exists.";
//   //   } else {
//   //     // Validation successful; no existing username or email found
//   //     // document.getElementById("validationGreen").innerHTML =
//   //     //   "Successfully Created an Account";

//   //     // Save user information in localStorage, including the score
//   //     userObj.topScore = 0; // Set initial score to 0
//   //     users.push(userObj);

//       try {
        
//       res.send(userObj)
//       }

//         catch (error) {
//           console.error(error);
//           response.status(500).send("An error occurred while saving data");
//         }
      
       

     
//       // Save user information in sessionStorage after successful registration
//     });


// Login page Validations
function loginVal() {
  // Get the data
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Reset validation messages
  document.getElementById("validation").innerHTML = "";
  document.getElementById("validationRed").innerHTML = "";
  document.getElementById("validationGreen").innerHTML = "";

  if (username === "" || password === "") {
    // Display a message if fields are empty
    document.getElementById("validation").innerHTML = "Enter All Fields";
  } else {
    // Check if the user exists in the "users" array in local storage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find((u) => u.username === username);

    if (!foundUser) {
      // Display a message if the user is not found
      document.getElementById("validationRed").innerHTML =
        "User Has Not Been Found";
    } else {
      // Retrieve user object from the "users" array
      const userObj = foundUser;

      // Convert the stored password to a string before comparison
      const storedPassword = String(userObj.password);

      // Check if the entered password matches the stored password
      if (storedPassword === password) {
        // Display a success message if login is successful
        document.getElementById("validationGreen").innerHTML =
          "Login Successfully";

        // Save user information in sessionStorage after successful login
        sessionStorage.setItem("loggedInUser", username);
      } else {
        // Display a message if the entered password is incorrect
        document.getElementById("validationRed").innerHTML =
          "User Password is Incorrect";
      }
    }
  }
}

// Start the app listening on port 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});




