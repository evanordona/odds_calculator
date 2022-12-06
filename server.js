const path = require('path');
const express = require('express');
require("dotenv").config({ path: path.resolve(__dirname, 'dontPost/.env') });
const { MongoClient, ServerApiVersion } = require('mongodb');
const { createListing } = require('./mongoFns');
const userName = process.env.MONGO_DB_USERNAME;
const passWord = process.env.MONGO_DB_PASSWORD;
const bodyParser = require('body-parser');
const { nba } = require('sportsdataverse');

const uri = `mongodb+srv://${userName}:${passWord}@cluster0.earomsm.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    useNewUrlParser: true, useUnifiedTopology:
        true, serverApi: ServerApiVersion.v1
});

const app = express();

const portNumber = process.env.PORT || 5000;

app.set("views", path.resolve(__dirname, "templates"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/client/build")));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
// });

app.use(bodyParser.urlencoded({ extended: false }));

process.stdin.setEncoding('utf-8');


app.get('/', async(req, res) => {
    let json = await nba.getTeamInfo(15);

    const variables = {
        "name": json["team"]["name"],
        "stats": json["team"]["record"]["items"]["stats"]
    }

    await createListing(client, variables).catch(console.error);
    res.render("test", variables);;
});

app.get('/calculate', async (req, res) => {
    findListing
    
});


app.listen(portNumber, () => {
    console.log(`Server listening on localhost:${portNumber}`);
});