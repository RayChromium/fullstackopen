require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Note = require('./modules/note');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method );
    console.log( 'Path: ', request.path );
    console.log( 'Body: ', request.body );
    console.log('---');
    next();
};

app.use(requestLogger);

app.get('/', (request, response) => {
    response.send('<h1>Hello World!<h1/>');
});

app.get('/api/notes', (request, response) => {
    Note.find({}).then( note => {
        response.json(note);
    } );
});

app.get('/api/notes/:id', (request, response, next) => {
    // console.log('request.params.id:',request.params.id);
    // const id = Number(request.params.id);
    // note that the findById take in the id as a String now, so don't convert
    Note.findById(request.params.id)
        .then( note => {
            if(note) {
                response.json(note);
            } else {
                response.status(404).end();
            }
        } )
        .catch( error => {
            next(error);
        } );
});

app.delete( '/api/notes/:id', (request, response, next) => {
    // const id = Number(request.params.id);
    // console.log('id:', id, ' type of id:', typeof id);
    Note.findByIdAndRemove(request.params.id)
        .then( result => {
            // https://www.rfc-editor.org/rfc/rfc9110.html#name-204-no-content
            // 204 No Content
            // The 204 (No Content) status code indicates that the server has successfully fulfilled the request and that there is no additional content to send in the response content.
            response.status(204).end();
        } )
        .catch( error => next(error) );
} );

app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body;
    console.log('body:', body);
    // aka: body.content is undefined:
    if(!body.content) {
        return response.status(400).json({ error: 'content missing' });
    }

    const { content, important } = body;

    Note.findByIdAndUpdate(request.params.id,
        { content, important } ,
        { new:true, runValidators:true, context: 'query' })
        .then( updatedNote => {
            response.json(updatedNote);
        } )
        .catch( error => next(error) );
});

app.post( '/api/notes', (request, response, next) => {
    const body = request.body;

    console.log('body:', body);
    // aka: body.content is undefined:
    if(!body.content) {
        return response.status(400).json({ error: 'content missing' });
    }


    const note = new Note({
        content: body.content,
        important: body.important || false,
    });

    note.save()
        .then( savedNote => {
            response.json(savedNote);
        } )
        .catch( error => next(error) );
} );

// the handler dealing with unknown endpoint cannot come before routes
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error:'Unknown Endpoint' });
};

app.use( unknownEndpoint );

// handler of requests with result to errors must come at the end
const errorHandler = ( error, request, response, next ) => {
    console.log(error.message);

    if(error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if( error.name === 'ValidationError' ) {
        return response.status(400).json({ error: error.message });
    }

    next(error);
};

app.use(errorHandler);

const PORT =  process.env.PORT || 3001;

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
});