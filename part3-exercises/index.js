const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(express.json());
app.use(morgan('tiny'));

const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method );
    console.log( 'Path: ', request.path );
    console.log( 'Body: ', request.body );
    console.log('---');
    next();
}

app.use(requestLogger);

let persons = [
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

const generateId = () =>{
    let id;
    while( true ) {
        id = Math.floor( 1024 * 1024 * Math.random() );
        if( persons.filter( p => p.id === id ).length === 0 ){
            break;
        }
    }
    return id;
}


app.get( '/api/persons', (request, response) => {
    response.json(persons);
} );

app.get( '/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    console.log(`get id: ${id}, type: ${typeof id}`);
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

app.delete( '/api/persons/:id', (request, respond) => {
    const id = Number(request.params.id);
    console.log(`delete id: ${id}, type: ${typeof id}`);
    persons = persons.filter( person => person.id !== id );

    respond.status(204).end();
} );

app.post( '/api/persons', (request, response) => {
    const body = request.body;
    console.log('post request body:', body);

    if( !body.name || !body.number ) {
        return response.status(400).json( {message: 'person info missing'} );
    }

    if( persons.filter( p => p.name === body.name ).length !== 0 ) {
        return response.status(400).json( {message: `${body.name} already exist in the book`} );
    }

    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }
    console.log('new person: ', newPerson);
    persons = persons.concat(newPerson);
    response.json(newPerson);
} );

const PORT = 3001;

app.listen( PORT, () => {
    console.log('server for part3 exercise running on p3001');
});