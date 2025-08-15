const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Authentication',
    required: true
  },
  employeeId: {
    type: String,
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AddSubject'
    }
  ]
});

module.exports = mongoose.model('Faculty', facultySchema);
