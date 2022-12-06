const path = require('path');
require("dotenv").config({path: path.resolve(__dirname, 'dontPost/.env')});

const db_name = process.env.MONGO_DB_NAME;
const collection_name = process.env.MONGO_COLLECTION;
const databaseAndCollection = {db: db_name, collection: collection_name};

async function createListing(client, newListing) {
   
    try {
        await client.connect();
        const result = await client.db(databaseAndCollection.db).collection(databaseAndCollection.collection).insertOne(newListing);
    } catch (e) {
        console.error('The error is', e);
    } finally {
        await client.close();
    }
}

module.exports = {createListing};

