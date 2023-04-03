const notesRouter = require('express').Router();
const Note = require('../models/note');
const logger = require('../utils/logger');

notesRouter.get('/', async (request, response) => {
    const notes = await Note.find({});
    response.json(notes);
});

// notesRouter.get('/:id', (request, response, next) => {
notesRouter.get('/:id', async (request, response) => {
    // logger.info('request.params.id:',request.params.id);
    // const id = Number(request.params.id);
    // note that the findById take in the id as a String now, so don't convert
    // Note.findById(request.params.id)
    //     .then( note => {
    //         if(note) {
    //             response.json(note);
    //         } else {
    //             response.status(404).end();
    //         }
    //     } )
    //     .catch( error => {
    //         next(error);
    //     } );
    const note = await Note.findById(request.params.id);
    if(note) {
        response.json(note);
    } else {
        response.status(404).end();
    }
});

// notesRouter.post( '/', (request, response, next) => {
notesRouter.post( '/', async (request, response) => {
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

    // note.save()
    //     .then( savedNote => {
    //         response.status(201).json(savedNote);
    //     } )
    //     .catch( error => next(error) );
    const savedNote = await note.save();
    response.status(201).json(savedNote);
} );

// notesRouter.delete( '/:id', (request, response, next) => {
notesRouter.delete( '/:id', async (request, response) => {
    // const id = Number(request.params.id);
    // logger.info('id:', id, ' type of id:', typeof id);
    // Note.findByIdAndRemove(request.params.id)
    //     .then( result => {
    //         // https://www.rfc-editor.org/rfc/rfc9110.html#name-204-no-content
    //         // 204 No Content
    //         // The 204 (No Content) status code indicates that the server has successfully fulfilled the request and that there is no additional content to send in the response content.
    //         response.status(204).end();
    //     } )
    //     .catch( error => next(error) );
    await Note.findByIdAndRemove(request.params.id);
    // https://www.rfc-editor.org/rfc/rfc9110.html#name-204-no-content
    // 204 No Content
    // The 204 (No Content) status code indicates that the server has successfully fulfilled the request and that there is no additional content to send in the response content.
    response.status(204).end();
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