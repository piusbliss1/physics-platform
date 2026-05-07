const express = require('express');
const {
  getModules,
  getModule,
  createModule,
  updateModule,
  deleteModule
} = require('../controllers/moduleController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getModules)
  .post(protect, authorize('teacher'), createModule);

router.route('/:id')
  .get(getModule)
  .put(protect, authorize('teacher'), updateModule)
  .delete(protect, authorize('teacher'), deleteModule);

module.exports = router;
