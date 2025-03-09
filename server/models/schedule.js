const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  device: { type: String, required: true },
  instructions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Instruction' }],
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;