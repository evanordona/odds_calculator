import express from 'express';

const app = express();

const portNumber = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(portNumber, () => { 
    console.log(`Server listening on localhost:${portNumber}`);
});