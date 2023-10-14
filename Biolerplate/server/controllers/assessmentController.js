
const AssessmentResult = require('../models/assessmentResults');

exports.submitAssessment = async (req, res) => {
  try {
    const { personalityType } = req.body;
    const assessmentResult = new AssessmentResult({ user: req.user._id, personalityType });
    await assessmentResult.save();

    res.status(201).send({ assessmentResult });
  } catch (error) {
    res.status(400).send({ error: 'Assessment submission failed' });
  }
};
