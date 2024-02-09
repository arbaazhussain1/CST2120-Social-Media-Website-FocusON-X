import { MongoClient } from 'mongodb';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
const studentid = 'M00872279';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve up static files from the public folder
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/public')));

// Middleware to set the correct MIME type for CSS files
app.use((req, res, next) => {
  if (req.url.endsWith('.css')) {
    res.setHeader('Content-Type', 'text/css');
  }
  next();
});

// Serve up static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

app.get(`/${studentid}`, (request, response) => {
  // Get data from MongoDB
  const filePath = path.join(__dirname, '/public/index.html');
  response.sendFile(filePath);
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
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

app.listen(port, () => {
  console.log(`Example app listening on port ${port}/${studentid}`);
});