const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  securityQuestion: { type: String, required: true },
  securityAnswer: { type: String, required: true },
  humidity: { type: Number, required: false },
  temperature: { type: Number, required: false },
  devices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }],
  schedules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }],
  energysources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EnergySource' }]
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Check if the model is already compiled
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;