const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  device: { type: String, required: true },
  instructions: { type: String, required: true },
  status: { type: String, default: 'Active' }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;