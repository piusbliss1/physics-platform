const express = require('express');
const { getStudentStats, getTeacherStats } = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/student', protect, authorize('student'), getStudentStats);
router.get('/teacher', protect, authorize('teacher'), getTeacherStats);

module.exports = router;
