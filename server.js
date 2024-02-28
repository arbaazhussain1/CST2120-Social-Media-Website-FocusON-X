import { MongoClient, ServerApiVersion } from "mongodb";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Serve up static files from the public folder
app.use(bodyParser.json());
app.use(express.static("./public"));

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
  
  app.post(`/M00872279`, async (request, response) => {
    try {
      const result = await usersCollection.insertOne(request.body);
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




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});




