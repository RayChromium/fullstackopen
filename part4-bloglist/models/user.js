const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 4,
        required: true,
        unique: true,
    },
    name: String,
    passwordHash: {
        type: String,
        minLength: 4,
        required: true,
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
        }
    ]
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
    transform: (document, returnedDocument) => {
        returnedDocument.id = returnedDocument._id.toString();
        delete returnedDocument._id;
        delete returnedDocument.__v;
        // the passwordHash should not be revealed
        delete returnedDocument.passwordHash;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;