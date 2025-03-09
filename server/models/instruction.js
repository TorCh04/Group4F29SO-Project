const mongoose = require('mongoose');

const instructionsSchema = new mongoose.Schema({
    insruction: { type: String, required: true }
  });
  
const Instruction = mongoose.model('Instruction', instructionsSchema);

module.exports = Instruction;