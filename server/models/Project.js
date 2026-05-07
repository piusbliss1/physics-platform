const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  materials: [String],
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  educationalValue: String,
  moduleId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Module'
  }
});

module.exports = mongoose.model('Project', projectSchema);
