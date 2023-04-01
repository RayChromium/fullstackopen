const notesRouter = require('express').Router();
const Note = require('../models/note');
const logger = require('../utils/logger');

notesRouter.get('/', async (request, response) => {
    const notes = await Note.find({});
    response.json(notes);
});

notesRouter.get('/:id', (request, response, next) => {
    // logger.info('request.params.id:',request.params.id);
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

notesRouter.post( '/api/notes', (request, response, next) => {
    const body = request.body;

    logger.info('body:', body);
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

notesRouter.delete( '/:id', (request, response, next) => {
    // const id = Number(request.params.id);
    // logger.info('id:', id, ' type of id:', typeof id);
    Note.findByIdAndRemove(request.params.id)
        .then( result => {
            // https://www.rfc-editor.org/rfc/rfc9110.html#name-204-no-content
            // 204 No Content
            // The 204 (No Content) status code indicates that the server has successfully fulfilled the request and that there is no additional content to send in the response content.
            response.status(204).end();
        } )
        .catch( error => next(error) );
} );

notesRouter.put('/:id', (request, response, next) => {
    const body = request.body;
    logger.info('body:', body);
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

module.exports = notesRouter;