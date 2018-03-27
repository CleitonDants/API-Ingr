const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ingr');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userDataSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    tickets: Array
}, {
    collection: 'ingr_users'
});

module.exports = mongoose.model('User', userDataSchema);

// [{
//     eventName: {
//         type: String,
//         required: true
//     },
//     local: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: String,
//         required: true,
//         default: "Not defined yet"
//     },
//     usdPrice: {
//         type: Number,
//         required: true
//     }
// }]