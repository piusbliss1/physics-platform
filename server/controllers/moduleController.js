const Module = require('../models/Module');

// @desc    Get all modules
// @route   GET /api/modules
exports.getModules = async (req, res, next) => {
  try {
    const modules = await Module.find().sort('order');
    res.status(200).json({ success: true, count: modules.length, data: modules });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get single module
// @route   GET /api/modules/:id
exports.getModule = async (req, res, next) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) {
      return res.status(404).json({ success: false, error: 'Module not found' });
    }
    res.status(200).json({ success: true, data: module });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Create new module (teacher only)
// @route   POST /api/modules
exports.createModule = async (req, res, next) => {
  try {
    const module = await Module.create(req.body);
    res.status(201).json({ success: true, data: module });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update module
// @route   PUT /api/modules/:id
exports.updateModule = async (req, res, next) => {
  try {
    const module = await Module.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!module) {
      return res.status(404).json({ success: false, error: 'Module not found' });
    }
    res.status(200).json({ success: true, data: module });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete module
// @route   DELETE /api/modules/:id
exports.deleteModule = async (req, res, next) => {
  try {
    const module = await Module.findByIdAndDelete(req.params.id);
    if (!module) {
      return res.status(404).json({ success: false, error: 'Module not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
