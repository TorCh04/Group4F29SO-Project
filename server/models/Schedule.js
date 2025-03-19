const mongoose = require('mongoose');

const instructionSchema = new mongoose.Schema({
  action: { type: String, required: true },
  hour: { type: Number, required: true },
  minute: { type: Number, required: true }
});

const scheduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },
  instructions: [instructionSchema],
  status: { type: String, default: 'Active' }
});

const Schedule = mongoose.models.Schedule || mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;