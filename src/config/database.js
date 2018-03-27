const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ingr');

const userDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  tickets: Array,
}, { collection: 'ingr_users' });

module.exports = mongoose.model('User', userDataSchema);
