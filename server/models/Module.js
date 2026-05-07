const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  learningObjectives: [String],
  detailedNotes: String,
  summary: String,
  quizQuestions: [
    {
      question: String,
      options: [String],
      correctAnswer: Number // index
    }
  ],
  practicalExperiment: {
    title: String,
    aim: String,
    apparatus: [String],
    procedure: [String],
    observationTable: String, // HTML or plain text
    analysis: String,
    conclusion: String
  },
  studentProject: {
    title: String,
    description: String,
    materials: [String],
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced']
    },
    educationalValue: String
  },
  order: Number
});

module.exports = mongoose.model('Module', moduleSchema);
