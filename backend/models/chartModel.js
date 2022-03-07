const mongoose = require('mongoose');

const chartSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: [true, 'Please add a chart name'] },
    current: { type: String, default: '' },
    goal: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Chart', chartSchema);
