const mongoose = require("mongoose");

// EnergyGenerated schema and model
const energyGeneratedSchema = new mongoose.Schema({
  device: { type: mongoose.Schema.Types.ObjectId, ref: "EnergySource" }, // Updated to use ObjectId
  data: [
    {
      timestamp: { type: Date, default: Date.now },
      energyGenerated: { type: Number, required: true },
    },
  ],
});

const EnergyGenerated = mongoose.models.EnergyGenerated || mongoose.model("EnergyGenerated", energyGeneratedSchema);

module.exports = EnergyGenerated;