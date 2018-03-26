const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ingr');

const Schema = mongoose.Schema;

const userDataSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    tickets: [{
        eventName: String,
        local: String,
        date: String,
        usdPrice: Number,
    }]
}, {
    collection: 'ingr_users'
});

const user = mongoose.model('User', userDataSchema);

module.exports = user;