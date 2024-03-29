const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const Note = require('../models/note');

const api = supertest(app);

beforeEach( async () => {
    await Note.deleteMany({});

    for( let note of helper.initialNotes ) {
        let noteObject = new Note(note);
        await noteObject.save();
    }
}, 100000);

// beforeEach(() => {
//     // await Note.deleteMany({})
//     // let noteObject = new Note(initialNotes[0])
//     // await noteObject.save()
//     // noteObject = new Note(initialNotes[1])
//     // await noteObject.save()
//     Note.deleteMany({})
//         .then( () => {
//             let noteObject = new Note(initialNotes[0]);
//             noteObject.save()
//                 .then( () => {
//                     noteObject = new Note(initialNotes[1]);
//                     noteObject.save();
//                 } );
//         } )
//         .catch(error => console.error(error));
// });

test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/);
}, 100000);

test('there are two notes', async () => {
    const response = await api.get('/api/notes');

    expect(response.body).toHaveLength(helper.initialNotes.length);
});

test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes');
    const contents = response.body.map( r => r.content );
    expect(contents).toContain('Browser can execute only JavaScript');
});

test('a valid note can be added', async () => {
    const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
    };

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type',  /application\/json/);

    const notesAtEnd = await helper.notesInDB();
    expect( notesAtEnd ).toHaveLength( helper.initialNotes.length + 1 );

    const contents = notesAtEnd.map(n => n.content);
    expect(contents).toContain( 'async/await simplifies making async calls' );
});

test('note without content is not added', async () => {
    const newNote = {
        important: true,
    };

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(400);

    const notesAtEnd = await helper.notesInDB();
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
});

test('a specific note can be viewed', async () => {
    const notesAtStart = await helper.notesInDB();

    const noteToView = notesAtStart[0];

    const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

    expect(resultNote.body).toEqual(noteToView);
});

test('a note can be deleted', async () => {
    const notesAtStart = await helper.notesInDB();
    const noteToDelete = notesAtStart[0];

    await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204);

    const notesAtEnd = await helper.notesInDB();

    expect(notesAtEnd).toHaveLength( helper.initialNotes.length - 1 );

    const contents = notesAtEnd.map(n => n.content);

    expect(contents).not.toContain(noteToDelete.content);
});

afterAll( async () => {
    await mongoose.connection.close();
} );