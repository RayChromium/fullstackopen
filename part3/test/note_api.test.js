const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Note = require('../models/note');

const api = supertest(app);

const initialNotes = [
    {
        content: 'HTML is easy',
        important: false,
    },
    {
        content: 'Browser can execute only JavaScript',
        important: true,
    },
];

beforeEach( async () =>{
    await Note.deleteMany({});
    let noteObject = new Note(initialNotes[0]);
    await noteObject.save();
    noteObject = new Note(initialNotes[1]);
    await noteObject.save();
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

    expect(response.body).toHaveLength(initialNotes.length);
});

test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes');
    const contents = response.body.map( r => r.content );
    expect(contents).toContain('Browser can execute only JavaScript');
});

afterAll( async () => {
    await mongoose.connection.close();
} );