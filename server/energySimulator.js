const User = require("./models/User");
const EnergyUsage = require("./models/energy");
const EnergyGenerated = require("./models/energyG");
const Device = require("./models/Device");
const EnergySource = require("./models/energySource");

// Function to generate random energy usage data for users
function generateRandomData(deviceType) {
  if (deviceType === "Roomba") {
    return Math.floor(Math.random() * (60 - 20 + 1)) + 20; // Random number between 20 and 60
  } else if (deviceType === "Light Switch") {
    return Math.floor(Math.random() * (12 - 9 + 1)) + 9; // Random number between 9 and 12
  } else {
    return Math.floor(Math.random() * (120 - 80 + 1)) + 80; // Random number between 80 and 120
  }
}

// Function to update the energy usage data for all users
async function updateUserData() {
  try {
    const energyUsages = await EnergyUsage.find();
    for (const energyUsage of energyUsages) {
      const check = await Device.findById(energyUsage.device);
      if (check && check.status === "Connected") {
        energyUsage.data.push({
          timestamp: Date.now(),
          energyUsage: generateRandomData(check.type),
        });
        await energyUsage.save();
      }
    }
  } catch (error) {
    console.error("Error updating energy data:", error);
  }
}

// Function to generate random energy production data for energy sources
function generateRandomDataEG(deviceType) {
  if (deviceType === "Solar Panel") {
    return Math.floor(Math.random() * (100 - 50 + 1)) + 50; // Random number between 50 and 100
  } else {
    return Math.floor(Math.random() * (200 - 150 + 1)) + 150; // Random number between 150 and 200
  }
}

// Function to update the energy production data for all energy sources
async function updateUserDataEG() {
  try {
    const energyGeneratedRecords = await EnergyGenerated.find();
    for (const energyGenerated of energyGeneratedRecords) {
      const check = await EnergySource.findById(energyGenerated.device);
      if (check && check.status === "Connected") {
        energyGenerated.data.push({
          timestamp: Date.now(),
          energyGenerated: generateRandomDataEG(check.type),
        });
        await energyGenerated.save();
      }
    }
  } catch (error) {
    console.error("Error updating energy production data:", error);
  }
}

// Function to start the energy usage simulation
function startEnergySimulation() {
  setInterval(updateUserData, 60000); // Update every 60 seconds
}

// Function to start the energy production simulation
function startEnergySimulationEG() {
  setInterval(updateUserDataEG, 60000); // Update every 60 seconds
}

module.exports = { startEnergySimulation, startEnergySimulationEG };