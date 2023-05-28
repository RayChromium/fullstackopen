const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    // only when ref is defined can the database know how to populate
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    important:Boolean
});
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});


module.exports = mongoose.model('Note', noteSchema);