const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
});

const Device = mongoose.models.Device || mongoose.model('Device', deviceSchema);

module.exports = Device;