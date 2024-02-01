const { MongoClient } = require('mongodb');
const express = require('express')
const app = express()
const port = 3000


const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
 
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
        await  listDatabases(client);

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




app.listen(port, () => {  console.log(`Example app listening on port ${port}`)
})
 
app.use('/M00872279', express.static('public/HTML'))