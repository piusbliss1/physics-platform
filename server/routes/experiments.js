const express = require('express');
const { getExperiments, createExperiment } = require('../controllers/experimentController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getExperiments)
  .post(protect, authorize('teacher'), createExperiment);

module.exports = router;
