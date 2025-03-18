const mongoose = require("mongoose");

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
module.exports =  EnergyGenerated;