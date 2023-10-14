
const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  personalityType: String,
  // Add more fields as needed
});

const AssessmentResult = mongoose.model('AssessmentResult', assessmentSchema);

module.exports = AssessmentResult;
