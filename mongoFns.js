import path from 'path';
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(process.cwd(), 'dontPost/.env') });

const db_name = process.env.MONGO_DB_NAME;
const collection_name = process.env.MONGO_COLLECTION;
const databaseAndCollection = { db: db_name, collection: collection_name };

async function createListing(client, newListing) {

    await client.db(databaseAndCollection.db).collection(databaseAndCollection.collection).insertOne(newListing, async (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Inserting ', newListing);
        }
    });

}

async function deleteAllTeams(client) {

    await client.connect();
    await client.db(databaseAndCollection.db)
        .collection(databaseAndCollection.collection)
        .deleteMany({});

}

export { createListing, deleteAllTeams };

