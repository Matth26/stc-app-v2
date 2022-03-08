const mongoose = require('mongoose');
const StepSchema = require('./stepModel');

const chartSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: [true, 'Please add a chart name'] },
    current: { type: String, default: '' },
    goal: { type: String, default: '' },
    steps: { type: [StepSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Chart', chartSchema);
