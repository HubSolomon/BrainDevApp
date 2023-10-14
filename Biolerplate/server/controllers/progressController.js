

const Progress = require('../models/progress');

exports.trackProgress = async (req, res) => {
  try {
    const progress = new Progress({ user: req.user._id });
    await progress.save();

    res.status(201).send({ progress });
  } catch (error) {
    res.status(400).send({ error: 'Progress tracking failed' });
  }
};
