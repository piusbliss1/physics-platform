const express = require('express');
const { getQuizByModule, createQuiz } = require('../controllers/quizController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/module/:moduleId')
  .get(getQuizByModule)
  .post(protect, authorize('teacher'), createQuiz);

module.exports = router;
