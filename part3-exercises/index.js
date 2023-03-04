const express = require('express');
const app = express();
app.use(express.json());

const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get( '/api/persons', (request, response) => {
    response.json(persons);
} );

app.get( '/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    console.log(`id: ${id}, type: ${typeof id}`);
    const person = persons.find( p => p.id === id );
    console.log(`person: ${person}`);
    if(person) {
        response.json(person);
    } else {
        response.status(404).end();
    } 
} );

app.get( '/', (request, response) => {
    response.send('<h1>Hello! This is the server running for part3 exercise</h1>');
} );

app.get( '/info', (request, response) => {
    console.log(request.body);
    const date = new Date();
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${date[Symbol.toPrimitive]('string')}</p>
    `);
} );

const PORT = 3001;

app.listen( PORT, () => {
    console.log('server for part3 exercise running on p3001');
});