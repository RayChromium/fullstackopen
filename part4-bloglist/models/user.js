const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
        }
    ]
});

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