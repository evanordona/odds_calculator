import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(process.cwd(), 'dontPost/.env') });
import { createListing, deleteAllTeams } from './mongoFns.js';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import { MongoClient, ServerApiVersion } from 'mongodb';

const userName = process.env.MONGO_DB_USERNAME;
const passWord = process.env.MONGO_DB_PASSWORD;

const uri = `mongodb+srv://${userName}:${passWord}@cluster0.earomsm.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    useNewUrlParser: true, useUnifiedTopology:
        true, serverApi: ServerApiVersion.v1
});

const API_KEY = process.env.API_KEY;

const app = express();

const portNumber = process.env.PORT || 5000;

app.set("views", path.resolve(process.cwd(), "templates"));
app.set("view engine", "ejs");
app.use(express.static(path.join(process.cwd(), "/client/build")));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
// });

app.use(bodyParser.urlencoded({ extended: false }));

process.stdin.setEncoding('utf-8');

app.get('/', async (req, res) => {
    console.log('deleting teams from database');
    try {
        await client.connect();
        await deleteAllTeams(client).catch(console.error);
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
   
    res.send('deleted teams')
})

app.get('/api', async (req, res) => {
    console.log('fetching data from api');
    let response = await fetch(`https://api.sportsdata.io/v3/nba/scores/json/TeamSeasonStats/2022?key=${API_KEY}`);

    if (!response.ok) {
        throw new Error('HTTP error: ' + response.status);
    }
    const data = await response.json();

    try {
        await data.forEach(async (element) => {

            const team = {
                "name": element["Name"],
                "winPct": (element["Wins"] / element["Losses"]),
                "diff": (element["Points"] / element["Games"] - element["OpponentStat"]["Points"] / element["OpponentStat"]["Games"])
            }
            try {
                await client.connect();
                await createListing(client, team).catch(console.error);
            }catch (e) {
                console.error(e);
            } 

        });

        client.close();

    } catch (e) {
        console.error('The error is', e);
    }
    res.send('finished');
});

// app.get('/calculate', async (req, res) => {

// });


app.listen(portNumber, () => {
    console.log(`Server listening on localhost:${portNumber}`);
});

await client.close();

