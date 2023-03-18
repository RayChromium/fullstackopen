const mongoose = require('mongoose');

if(process.argv.length < 3) {
    console.log('give password as an argument');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://raychromium:${password}@fullstackopen-p3.xixbwjc.mongodb.net/noteApp?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
    content: String,
    important:Boolean
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
    content: 'First note in mongo',
    important: true
});

// add to database
// note.save().then( result => {
//     console.log('note saved!');
//     mongoose.connection.close();
// } )

// fetch from database:
Note.find({}).then( result => {
    console.log(result);
    result.forEach( note => console.log(note) );
    mongoose.connection.close();
} );