const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ingr');

const Schema = mongoose.Schema;

const userDataSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: String
}, {
    collection: 'ingr_users'
});

const user = mongoose.model('User', userDataSchema);

module.exports = user;