const User = require('../models/User');
const Module = require('../models/Module');

// Student dashboard stats (you can extend with progress tracking)
exports.getStudentStats = async (req, res, next) => {
  try {
    // Placeholder: fetch modules count, completed modules (would need progress model)
    const totalModules = await Module.countDocuments();
    // Simulate completion
    const completed = 2; // hardcoded for demo
    res.status(200).json({
      success: true,
      data: {
        totalModules,
        completedModules: completed,
        quizzesTaken: 5,
        averageScore: 72
      }
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Teacher dashboard stats
exports.getTeacherStats = async (req, res, next) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalModules = await Module.countDocuments();
    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        totalModules,
        totalExperiments: 8,
        totalProjects: 6
      }
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
