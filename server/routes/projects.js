const express = require('express');
const { getProjects, createProject } = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getProjects)
  .post(protect, authorize('teacher'), createProject);

module.exports = router;
