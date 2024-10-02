const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['Admin', 'User'],
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Role', roleSchema);
