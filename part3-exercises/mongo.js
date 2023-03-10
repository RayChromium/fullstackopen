const mongoose = require('mongoose');

if( process.argv.length < 3 ) {
    console.log('give password as an argument');
    process.exit(1);
}

const insertNewNumberinfo = () => {
    const newPerson = new Person({
        name: process.argv[3],
        number: process.argv[4]
    });

    newPerson.save().then( result => {
        console.log(`added ${newPerson.name} number ${newPerson.number} to phonebook`);
        mongoose.connection.close();
    } )
}

const fetchPhonebook = () => {
    Person.find({}).then( result => {
        console.log(result);
        console.log('phonebook:');
        result.forEach( person => console.log(`${person.name} ${person.number}`) );
        mongoose.connection.close();
    } )
}

const password = process.argv[2];

const url = `mongodb+srv://raychromium:${password}@fullstackopen-p3.xixbwjc.mongodb.net/phonebookApp?retryWrites=true&w=majority`; 
mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = mongoose.Schema({
    name: String,
    number: String
});

const Person = mongoose.model('Person', personSchema);

if( process.argv.length === 3 ) { 
    fetchPhonebook();
} else if( process.argv.length === 5 ) {
    insertNewNumberinfo();
}