const mongoose = require('mongoose');

const experimentSchema = new mongoose.Schema({
  title: String,
  aim: String,
  apparatus: [String],
  procedure: [String],
  observationTable: String,
  analysis: String,
  conclusion: String,
  moduleId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Module'
  }
});

module.exports = mongoose.model('Experiment', experimentSchema);
