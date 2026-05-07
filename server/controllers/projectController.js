const Project = require('../models/Project');

exports.getProjects = async (req, res, next) => {
  try {
    let query;
    if (req.query.module) {
      query = Project.find({ moduleId: req.query.module });
    } else {
      query = Project.find();
    }
    const projects = await query;
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
