const User = require("./models/User");
const EnergyUsage = require("./models/energy");
const EnergyGenerated = require("./models/energy");
const Device = require("./models/Device");

// Function to generate random energy usage data for users
function generateRandomData(deviceType) {
  if (deviceType === "Roomba") {
    let value = Math.floor(Math.random() * (60 - 20 + 1)) + 20; // Random number between 20 and 60
    return value;
  } else if (deviceType === "Light Switch") {
    return Math.floor(Math.random() * (9 - 12 + 1)) + 12; // Random number between 9 and 12
  } else {
    return Math.floor(Math.random() * (120 - 80 + 1)) + 120; // Random number between 80 and 120
  }
}

// Function to update the energy usage data for all users
async function updateUserData() {
  try {
    const energyUsages = await EnergyUsage.find();
    for (const energyUsage of energyUsages) {
      check = await Device.findById(energyUsage.device);
      console.log("Energy usage device: " + energyUsage.device);
      console.log("Device status: " + check.status);
      if (check.status === "Connected") {
        energyUsage.data.push({
          timestamp: Date.now(),
          energyUsage: generateRandomData(check.type),
        });
        await energyUsage.save();
      }
    }
    console.log("Energy data updated successfully");
  } catch (error) {
    console.error("Error updating energy data:", error);
  }
}

// Function to start the simulation
function startEnergySimulation() {
  setInterval(updateUserData, 60000); // Update every 60 seconds
}

function generateRandomDataEG(deviceType) {
  if (deviceType === "Solar Panel") {
    return Math.floor(Math.random() * (100 - 50 + 1)) + 50; // Random number between 50 and 100
  } else {
    return Math.floor(Math.random() * (200 - 150 + 1)) + 150; // Random number between 150 and 200
  }
}

async function updateUserDataEG() {
  try {
    const energyGenerated = await EnergyGenerated.find();
    for (const energyGenerated of energyGenerated) {
      check = await Device.findById(energyGenerated.device);
      console.log("Energy generated device: " + energyGenerated.device);
      console.log("Device status: " + check.status);
      if (check.status === "Connected") {
        energyGenerated.data.push({
          timestamp: Date.now(),
          energyGenerated: generateRandomDataEG(check.type),
        });
        await energyGenerated.save();
      }
    }
    console.log("Energy data updated successfully");
  } catch (error) {
    console.error("Error updating energy data:", error);
  }
}

function startEnergySimulationEG() {
  setInterval(updateUserDataEG, 60000); // Update every 60 seconds
}

module.exports = { startEnergySimulation, startEnergySimulationEG };
