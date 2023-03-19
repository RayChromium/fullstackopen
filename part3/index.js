const config = require('./utils/config');
const middleware = require('./utils/middleware');
const express = require('express');
const cors = require('cors');
const notesRouter = require('./controllers/notes');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;
console.log('connencting to ', url);

mongoose.connect(url)
    .then( result => {
        console.log('connected to MongoDB');
    } )
    .catch( error => {
        console.log('Error connecting to mongoDB: ', error.message);
    } );

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

mongoose.set('strictQuery', false);

app.use( middleware.requestLogger );

app.use( '/api/notes', notesRouter );

app.use( middleware.unknownEndpoint );

app.use( middleware.errorHandler );

app.listen(config.PORT,() => {
    logger.info(`Server running on port ${config.PORT}`);
});