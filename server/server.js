const express = require("express");
const mongoose = require("mongoose");
const connectionURI = process.env.MONGODB_URI || "mongodb://localhost:27017/f29so";
const PORT = process.env.PORT || 8080;
const bcrypt = require("bcrypt");
const cors = require("cors");
const authRoutes = require("./routes/authentication"); // Import the authentication routes
const deviceRoutes = require("./routes/devices"); // Import the device routes
const leaderboardRoutes = require("./routes/leaderboard"); // Import leaderboard routes
const settingsRoutes = require("./routes/settings"); // Import the settings routes
const simulationDataRoutes = require("./routes/simulationData"); // Import the simulation data routes
const schedulesRoutes = require('./routes/schedules'); // Import the schedules routes
const energyRoutesUsage = require("./routes/energyData"); // Import the energy data routes
const energyRoutesGenerated = require("./routes/energyDataG"); // Import the energy data routes
const { startSimulation } = require("./dataSimulator");
const { startEnergySimulation, startEnergySimulationEG } = require("./energySimulator");

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json()); // Allow parsing of JSON request bodies
const corsOptions = {
  origin: process.env.NODE_ENV === "production"
    ? "https://moogle-expo-fc7f4aee8a60.herokuapp.com/"  // Heroku app URL in production
    : "http://localhost:5173",  // Localhost for dev
  methods: ["POST", "GET"],
  credentials: true
};
app.use(cors(corsOptions));


// Allow backend to server frontend files in production
const path = require("path");

// MongoDB connection
mongoose
  .connect(connectionURI)
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
app.use("/", energyRoutesUsage); // getEnergyData
app.use("/", energyRoutesGenerated); // getEnergyData

// Serve static frontend files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist"), { maxAge: "1d" }));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
