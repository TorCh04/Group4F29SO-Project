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


module.exports = EnergyUsage;