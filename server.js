import express from 'express';

const app = express();

const portNumber = process.env.PORT || 3000;



app.listen(portNumber, () => { 
    console.log(`Server listening on localhost:${portNumber}`);
});