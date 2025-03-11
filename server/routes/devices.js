const express = require("express");
const EnergyUsage = require("../models/energy");
const verifyToken = require("../middleware/verifyToken");
const Device = require("../models/Device");
const EnergySource = require("../models/energySource");
const User = require("../models/User");

const router = express.Router();

router.post("/addDevice", verifyToken, async (req, res) => {
  try {
    const newDevice = new Device({
      name: req.body.name,
      type: req.body.type,
      status: req.body.status,
    });

    await newDevice.save();

    // Add the new device to the user's devices array
    const user = await User.findById(req.user.id);
    user.devices.push(newDevice._id);
    await user.save();

    try {
      // Start Energy tracker
      const newEnergyUsage = new EnergyUsage({
        device: newDevice._id,
        data: [
          {
            timestamp: Date.now(),
            energyUsage: 0,
          },
        ],
      });
      await newEnergyUsage.save();
    } catch (err) {
      console.error("Error adding energy usage:", err);
      res
        .status(500)
        .json({ message: "Server error while adding energy usage" });
    }

    res
      .status(201)
      .json({ message: "Device added successfully", device: newDevice });
  } catch (error) {
    console.error("Error adding device:", error);
    res.status(500).json({ message: "Server error while adding device" });
  }
});

router.post("/removeDevice", verifyToken, async (req, res) => {
  try {
    const deviceId = req.body.deviceId;

    // Remove the device from the user's devices array
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { devices: deviceId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await Device.findByIdAndDelete(deviceId);

    res.status(200).json({ message: "Device removed successfully", user });
  } catch (error) {
    console.error("Error removing device:", error);
    res.status(500).json({ message: "Server error while removing device" });
  }
});

router.get("/getDevices", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("devices");
    res.json({ devices: user.devices });
  } catch (error) {
    console.error("Error fetching devices:", error);
    res.status(500).json({ message: "Server error while fetching devices" });
  }
});

router.post("/toggleDeviceStatus/:deviceId", verifyToken, async (req, res) => {
  try {
    const device = await Device.findById(req.params.deviceId);
    device.status =
      device.status === "Connected" ? "Not Connected" : "Connected";
    await device.save();
    res.json({ message: "Device status updated successfully" });
  } catch (error) {
    console.error("Error toggling device status:", error);
    res
      .status(500)
      .json({ message: "Server error while toggling device status" });
  }
});


// ENERGY SOURCES
router.post("/addEnergySource", verifyToken, async (req, res) => {
  try {
    const newEnergySource = new EnergySource({
      name: req.body.name,
      type: req.body.type,
      status: req.body.status,
    });

    await newEnergySource.save();

    // Add the new device to the user's devices array
    const user = await User.findById(req.user.id);
    user.energysources.push(newEnergySource._id);
    await user.save();

    // ENERGY PRODUCTION (IMPLEMENT LATER)
    // try {
    //   // Start Energy tracker
    //   const newEnergyUsage = new EnergyUsage({
    //     device: newDevice._id,
    //     data: [
    //       {
    //         timestamp: Date.now(),
    //         energyUsage: 0,
    //       },
    //     ],
    //   });
    //   await newEnergyUsage.save();
    // } catch (err) {
    //   console.error("Error adding energy usage:", err);
    //   res
    //     .status(500)
    //     .json({ message: "Server error while adding energy usage" });
    // }

    res
      .status(201)
      .json({ message: "Energy source added successfully", energySource: newEnergySource });
  } catch (error) {
    console.error("Error adding energy source:", error);
    res.status(500).json({ message: "Server error while adding energy source" });
  }
});

router.post("/removeEnergySource", verifyToken, async (req, res) => {
  try {
    const energySourceId = req.body.energySourceId;

    // Remove the device from the user's devices array
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { enerysources: energySourceId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await EnergySource.findByIdAndDelete(energySourceId);

    res.status(200).json({ message: "Energy source removed successfully", user });
  } catch (error) {
    console.error("Error removing energy source:", error);
    res.status(500).json({ message: "Server error while removing energy source" });
  }
});


router.get("/getEnergySources", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("energysources");
    res.json({ energySources: user.energysources }); // Ensure the property name matches the client code
  } catch (error) {
    console.error("Error fetching energy sources:", error);
    res.status(500).json({ message: "Server error while fetching energy sources" });
  }
});


router.post("/toggleEnergySourceStatus/:energySourceId", verifyToken, async (req, res) => {
  try {
    const energySource = await EnergySource.findById(req.params.energySourceId);
    energySource.status =
      energySource.status === "Connected" ? "Not Connected" : "Connected";
    await energySource.save();
    res.json({ message: "Energy source status updated successfully" });
  } catch (error) {
    console.error("Error toggling device energy source:", error);
    res
      .status(500)
      .json({ message: "Server error while toggling energy source status" });
  }
});


module.exports = router;
