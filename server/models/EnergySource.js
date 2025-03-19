const mongoose = require('mongoose');

const energySourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
});

const EnergySource = mongoose.models.EnergySource || mongoose.model('EnergySource', energySourceSchema);

module.exports = EnergySource;
