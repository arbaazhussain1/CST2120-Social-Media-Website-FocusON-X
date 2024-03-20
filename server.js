import { MongoClient, ServerApiVersion } from "mongodb";
import express from "express";
import bodyParser from "body-parser";
import expressSession from "express-session";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static("./public"));

app.use(
  expressSession({
    secret: "cst2120 secret",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true,
  })
);

let usersCollection; // Declare variable to store MongoDB collection
let postsCollection;

// MongoDB setup
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: false },
});

async function connectToDatabase() {
  try {
    await client.connect();
    const database = client.db("FocusON-X");
    usersCollection = database.collection("users");
    // const postsCollection = database.collection("posts");
    postsCollection = database.collection("posts");

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

connectToDatabase();

app.post("/M00872279/register", async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Insert the user into the database
    await usersCollection.insertOne({
      firstname,
      lastname,
      username,
      email,
      password,
    });

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "An error occurred while registering user" });
  }
});

app.post("/M00872279/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);

    // Find the user in the database
    const user = await usersCollection.findOne({ username });
    if (!user || user.password !== password) {
      return res.json({ error: "Username or password incorrect" });
    }

    // Store user session
    req.session.username = username;

    res.json({ message: "Login successful" });

    // Save user information in sessionStorage after successful login
    //   sessionStorage.setItem("loggedInUser", username);
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});

app.delete("/M00872279/login", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logout successful" });
});

// GET /checklogin. Checks to see if the user has logged in
app.get("/M00872279/login", (req, res) => {
  if (!req.session.username) {
    res.json({ login: false });
  } else {
    res.json({ login: true, username: req.session.username });
  }
});

// GET /users. Returns all the users.
app.get("/M00872279", async (req, res) => {
  try {
    const users = await usersCollection.find({}).toArray();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/M00872279/post", async (req, res) => {
  try {
    const post = req.body;
    console.log(req.body);

    //Run some checks
    //If missing, post.text=== undefined

    //Is the user logged in
    if(req.session.username === undefined){
      res.json({error: true, message: "Post failed; user not logged in."});
      return;
    }

    //Reached this point, should have correct post details and username

    // Insert the posts into the database
    await postsCollection.insertOne({
      username: req.session.username,
      text: post.text,
      title: post.title
    });

    res.json({ message: " post successfully" });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "An error occurred creating post" });
  }
});



// date,
      // videoURL,
      // title,
      // imageURL,
      // comments,
      // likes