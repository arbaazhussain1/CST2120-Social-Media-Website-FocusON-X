import { MongoClient, ServerApiVersion } from 'mongodb';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Serve up static files from the public folder
app.use(bodyParser.json());
app.use(express.static('./public'));


//set up database
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, {serverApi: {version: ServerApiVersion.v1, strict: false}});
const database = client.db("FocusON-X");
const usersCollection = database.collection("users");
const postsCollection = database.collection("posts");


app.get(`/M00872279`, async (request, response) => {
  // Get data from MongoDB
    const data = await postsCollection.find({}).toArray();
    console.log(data);


//   const collection =database.collection("posts");
//   const collection =database.collection("users");

  response.send(data);
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});