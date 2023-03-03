const express = require('express');
const app = express();
app.use(express.json());

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!<h1/>');
});

app.get('/api/notes', (request, response) => {
    response.json(notes);
});

app.get('/api/notes/:id', (request, response) => {
    // console.log('request.params.id:',request.params.id);
    const id = Number(request.params.id);
    const note = notes.find( note => {
        // console.log(note.id, typeof note.id, id, typeof id, note.id === id);
        return note.id === id;
      } );
    // console.log('note:',note);

    // undifined will be false. other things are true(including null)
    if(note) {
        response.json(note);
    } else {
        response.status(404).end();
    }
});

app.delete( '/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    console.log('id:', id, ' type of id:', typeof id);
    notes = notes.filter( note => note.id !== id );

    // https://www.rfc-editor.org/rfc/rfc9110.html#name-204-no-content
    // 204 No Content
    // The 204 (No Content) status code indicates that the server has successfully fulfilled the request and that there is no additional content to send in the response content.
    response.status(204).end();
} );

const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map( n => n.id )) : 0 ;
    return maxId + 1;
}

app.post( '/api/notes', (request, response) => {
    const body = request.body;
    
    console.log('body:', body);
    // aka: body.content is undefined:
    if(!body.content) {
        return response.status(400).json({ error: 'content missing' });
    }


    const note = {
        content: body.content,
        important: body.important || false,
        id: generateId()
    };

    notes = notes.concat(note);
    
    response.json(note);
} );

const PORT = 3001;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})