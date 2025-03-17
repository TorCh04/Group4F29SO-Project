const mongoose = require("mongoose");

// EnergyUsage schema and model
const energyUsageSchema = new mongoose.Schema({
  device: { type: mongoose.Schema.Types.ObjectId, ref: "Device" },
  data: [
    {
      timestamp: { type: Date, default: Date.now },
      energyUsage: { type: Number, required: true },
    },
  ],
});

const EnergyUsage = mongoose.model("EnergyUsage", energyUsageSchema);

// EnergyGenerated schema and model
const energyGeneratedSchema = new mongoose.Schema({
  device: { type: String, required: true },
  data: [
    {
      timestamp: { type: Date, default: Date.now },
      energyGenerated: { type: Number, required: true },
    },
  ],
});

const EnergyGenerated = mongoose.model("EnergyGenerated", energyGeneratedSchema);
module.exports = EnergyUsage, EnergyGenerated;