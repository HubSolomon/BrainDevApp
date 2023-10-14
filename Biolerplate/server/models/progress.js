
const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Add more fields as needed
});

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;
