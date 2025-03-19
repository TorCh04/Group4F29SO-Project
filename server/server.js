const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const authRoutes = require("./routes/authentication"); // Import the authentication routes
const deviceRoutes = require("./routes/devices"); // Import the device routes
const leaderboardRoutes = require("./routes/leaderboard"); // Import leaderboard routes
const settingsRoutes = require("./routes/settings"); // Import the settings routes
const simulationDataRoutes = require("./routes/simulationData"); // Import the simulation data routes
const schedulesRoutes = require('./routes/schedules'); // Import the schedules routes
const energyRoutes = require("./routes/energyData"); // Import the energy data routes
const { startSimulation } = require("./dataSimulator");
const { startEnergySimulation, startEnergySimulationEG } = require("./energySimulator");

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json()); // Allow parsing of JSON request bodies
app.use(
  cors({
    origin: "http://localhost:5173", // Localhosting Port
    methods: ["POST", "GET"], // Allow needed methods
  })
);

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/f29so")
  .then(() => {
    console.log("MongoDB connected");
    startSimulation(); // Start simulating temp + humidity
    startEnergySimulation(); // Start simulating energy usage
    startEnergySimulationEG(); // Start simulating energy generation
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/", authRoutes); // login / register / dashboard
app.use("/", deviceRoutes); // addDevice / removeDevice / getDevices / toggleDeviceStatus
app.use("/", settingsRoutes); // updateName / updateEmail / updatePassword / verifyPassword
app.use("/", leaderboardRoutes); // leaderboard
app.use("/", simulationDataRoutes); // getSimulationData
app.use("/", schedulesRoutes); // addSchedule / removeSchedule / getSchedules
app.use("/", energyRoutes); // getEnergyData

// Start server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
