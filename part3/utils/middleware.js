const logger = require('../utils/logger');
const requestLogger = (request, response, next) => {
    logger.info('Method: ', request.method );
    logger.info( 'Path: ', request.path );
    logger.info( 'Body: ', request.body );
    logger.info('---');
    next();
};

// the handler dealing with unknown endpoint cannot come before routes
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error:'Unknown Endpoint' });
};

// handler of requests with result to errors must come at the end
const errorHandler = ( error, request, response, next ) => {
    logger.info(error.message);

    if(error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if( error.name === 'ValidationError' ) {
        return response.status(400).json({ error: error.message });
    } else if( error.name === 'JsonWebTokenError' ) {
        return response.status(400).json({ error: error.message });
    }

    next(error);
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
};