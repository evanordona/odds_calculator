import { scrapeData } from './dataScraper.js';
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(process.cwd(), 'dontPost/.env') });
import { createListing, deleteAllTeams, findTeamsByName } from './mongoFns.js';
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


//Updates MongoDB by first deleting all documents and then fetching new data from API and inserting new documents

app.get('/', async (req, res) => {
    console.log('deleting teams from database');
    try {
        await client.connect();
        await deleteAllTeams(client).catch(console.error);
        console.log('fetching data from api');
        let response = await fetch(`https://api.sportsdata.io/v3/nba/scores/json/TeamSeasonStats/2022?key=${API_KEY}`);

        if (!response.ok) {
            throw new Error('HTTP error: ' + response.status);
        }
        const data = await response.json();
        let count = 1;
        await data.forEach(async (element) => {
            const [normalName] = element["Name"].split(" ").slice(-1)
            const team = {
                "name": normalName,
                "winPct": (element["Wins"] / element["Losses"]),
                "diff": (element["Points"] / element["Games"] - element["OpponentStat"]["Points"] / element["OpponentStat"]["Games"]),
            }
            await createListing(client, team);    
            console.log("Pushed element: ", element, count++);    
        });
    

    } catch (err) {
        console.error(err);
    } 

    res.send('finished')
})


// Scrapes 
app.get('/calculate', async (req, res) => {
    const msg = await scrapeData(`https://www.actionnetwork.com/nba/odds`);
    res.send(msg);
});

// Starts listening on localhost:{PORTNUMBER}
app.listen(portNumber, () => {
    console.log(`Server listening on localhost:${portNumber}`);
});

export default client;