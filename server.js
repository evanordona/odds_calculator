import { scrapeData } from './dataScraper.js';
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(process.cwd(), 'dontPost/.env') });
import { createListing, deleteAllTeams, findTeamsByName } from './mongoFns.js';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.set("views", path.resolve(__dirname, "templates"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:false}));
 

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
        data.forEach(async (element) => {
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

})

app.post('/games', async (req, res) => {
    const d = req.body.date;

    let response = await fetch(`https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/${d}?key=${API_KEY}`);

    if (!response.ok) {
        throw new Error('HTTP error: ' + response.status);
    }
    const data = await response.json();
    const games = [];
    data.forEach((element) => {
        const game = {
            "name1": element["HomeTeam"],
            "name2": element["AwayTeam"],
            "points1": element["HomeTeamScore"],
            "points2": element["AwayTeamScore"],
        }
        
        games.push(game)
    });

    let table = "<table border='1'><tr><th>Game</th><th>Score</th></tr>";

    
    games.forEach((entry) => {
            table += `<tr><td>${entry.name1} vs ${entry.name2}</td><td>${entry.points1} vs ${entry.points2}</td></tr>`;
    });

    table += "</table>";

    const variables = {
        gameTable: table
    }

    res.render('games-table', variables)

})

// Scrapes 
app.get('/calculate', async (req, res) => {
    const msg = await scrapeData(`https://www.actionnetwork.com/nba/odds`);
    res.send(msg);
});

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

const extendTimeoutMiddleware = (req, res, next) => {
    const space = ' ';
    let isFinished = false;
    let isDataSent = false;
  
    // Only extend the timeout for API requests
    if (!req.url.includes('/api')) {
      next();
      return;
    }
  
    res.once('finish', () => {
      isFinished = true;
    });
  
    res.once('end', () => {
      isFinished = true;
    });
  
    res.once('close', () => {
      isFinished = true;
    });
  
    res.on('data', (data) => {
      // Look for something other than our blank space to indicate that real
      // data is now being sent back to the client.
      if (data !== space) {
        isDataSent = true;
      }
    });
  
    const waitAndSend = () => {
      setTimeout(() => {
        // If the response hasn't finished and hasn't sent any data back....
        if (!isFinished && !isDataSent) {
          // Need to write the status code/headers if they haven't been sent yet.
          if (!res.headersSent) {
            res.writeHead(202);
          }
  
          res.write(space);
  
          // Wait another 15 seconds
          waitAndSend();
        }
      }, 15000);
    };
  
    waitAndSend();
    next();
  };
  
  app.use(extendTimeoutMiddleware);

// Starts listening on localhost:{PORTNUMBER}
app.listen(portNumber, () => {
    console.log(`Server listening on localhost:${portNumber}`);
});

export default client;