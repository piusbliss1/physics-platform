const Quiz = require('../models/Quiz');

exports.getQuizByModule = async (req, res, next) => {
  try {
    const quiz = await Quiz.findOne({ moduleId: req.params.moduleId });
    if (!quiz) {
      return res.status(404).json({ success: false, error: 'Quiz not found' });
    }
    res.status(200).json({ success: true, data: quiz });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.createQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json({ success: true, data: quiz });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
