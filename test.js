import { MongoClient, ServerApiVersion } from "mongodb";
import express from "express";
import bodyParser from "body-parser";
import expressSession from 'express-session';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static("./public"));

app.use(
  expressSession({
      secret: 'cst2120 secret',
      cookie: { maxAge: 60000 },
      resave: false,
      saveUninitialized: true
  })
);

let usersCollection; // Declare variable to store MongoDB collection

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
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

connectToDatabase();

app.post('/M00872279/register', async (req, res) => {
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
      password
    });

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "An error occurred while registering user" });
  }
});

app.post('/M00872279/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database
    const user = await usersCollection.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Username or password incorrect" });
    }

    // Store user session
    req.session.username = username;

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});

app.get('/M00872279/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: "Logout successful" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
