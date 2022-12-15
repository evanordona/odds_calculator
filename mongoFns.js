import path from 'path';
import dotenv from 'dotenv'
import { ConnectionClosedEvent } from 'mongodb';
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
    await client.db(databaseAndCollection.db)
        .collection(databaseAndCollection.collection)
        .deleteMany({});
}

async function findTeamsByName(client, team1, team2) {
    console.log("test5555555555555555555555");
    console.log("team1: ", team1);
    console.log("team2: ", team2);
    
    const result = await client.db(databaseAndCollection.db)
    .collection(databaseAndCollection.collection)
    .findOne({'name': team1});

    const result2 = await client.db(databaseAndCollection.db)
        .collection(databaseAndCollection.collection)
        .findOne({'name': team2});


    if (result && result2) {
        console.log("hehe")
        return [result, result2];
    } else {
        console.log("No listings found");
    }

    return null;

}

export { createListing, deleteAllTeams, findTeamsByName };

