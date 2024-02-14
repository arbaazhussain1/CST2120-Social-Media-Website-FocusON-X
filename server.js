import { MongoClient } from 'mongodb';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Serve up static files from the public folder
app.use(bodyParser.json());
app.use(express.static('./public'));


app.get(`/M00872279`, (request, response) => {
  // Get data from MongoDB

  response.send({message: "hello"});
});

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb://localhost:27017";

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});