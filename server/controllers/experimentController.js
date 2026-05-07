const Experiment = require('../models/Experiment');

// @desc    Get all experiments
// @route   GET /api/experiments
exports.getExperiments = async (req, res, next) => {
  try {
    let query;
    if (req.query.module) {
      query = Experiment.find({ moduleId: req.query.module });
    } else {
      query = Experiment.find();
    }
    const experiments = await query;
    res.status(200).json({ success: true, count: experiments.length, data: experiments });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// ... similar CRUD (create, update, delete) with teacher authorization
exports.createExperiment = async (req, res, next) => {
  try {
    const experiment = await Experiment.create(req.body);
    res.status(201).json({ success: true, data: experiment });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// For brevity, include only needed methods; full CRUD can be implemented similarly.
