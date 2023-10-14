
const express = require('express');
const assessmentController = require('../controllers/assessmentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/submit', authMiddleware, assessmentController.submitAssessment);

module.exports = router;
