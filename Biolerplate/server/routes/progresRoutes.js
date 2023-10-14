
const express = require('express');
const progressController = require('../controllers/progressController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/track', authMiddleware, progressController.trackProgress);

module.exports = router;
