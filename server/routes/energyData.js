const express = require("express");
const User = require("../models/User"); // Adjust the path as necessary
const verifyToken = require("../middleware/verifyToken"); // Adjust the path as necessary
const EnergyUsage = require("../models/energy");
const Device = require("../models/Device");
const router = express.Router();
