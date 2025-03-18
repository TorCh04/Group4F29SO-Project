const express = require("express");
const User = require("../models/User"); // Adjust the path as necessary
const verifyToken = require("../middleware/verifyToken"); // Adjust the path as necessary
const EnergyGenerated = require("../models/energyG");
const EnergyUsage = require("../models/energy");
const Device = require("../models/Device");
const router = express.Router();

//get energy data for a today in 3 hours interval
router.get("/energyData/today", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const devices = await Device.find({ _id: { $in: user.devices } }); // Find all devices that belong to the user  
    const energyData = Array(8).fill(0); // Array to store energy data for all devices
    for (const device of devices) {
        const energyUsage = await EnergyUsage.findOne({
            device: device._id,
        }).sort({ "data.timestamp": -1 }); // Find the latest energy data for the device
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayData = energyUsage.data.filter(
            (data) => data.timestamp >= today
        );
        for (const data of todayData) {
            const hour = new Date(data.timestamp).getHours();
            if (hour >= 0 && hour < 3) {
                energyData[0] += data.energyUsage;
            } else if (hour >= 3 && hour < 6) {
                energyData[1] += data.energyUsage;
            } else if (hour >= 6 && hour < 9) {
                energyData[2] += data.energyUsage;
            } else if (hour >= 9 && hour < 12) {
                energyData[3] += data.energyUsage;
            } else if (hour >= 12 && hour < 15) {
                energyData[4] += data.energyUsage;
            } else if (hour >= 15 && hour < 18) {
                energyData[5] += data.energyUsage;
            } else if (hour >= 18 && hour < 21) {
                energyData[6] += data.energyUsage;
            } else if (hour >= 21 && hour < 24) {
                energyData[7] += data.energyUsage;
            }
        }
    }
        res.json(energyData);
    } catch (error) {
        console.error("Error fetching energy data:", error);
        res
        .status(500)
        .json({ message: "Server error while fetching energy data" });
    }
}
);

router.get("/energyData/week", verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const devices = await Device.find({ _id: { $in: user.devices } }); // Find all devices that belong to the user
      const energyData = Array(7).fill(0); // Array to store energy data for all devices, initialized with 0
      const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
      for (const device of devices) {
        const energyUsage = await EnergyUsage.findOne({
          device: device._id,
        }).sort({ "data.timestamp": -1 }); // Find the latest energy data for the device
  
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const past7Days = new Date(today);
        past7Days.setDate(today.getDate() - 6); // 7 days ago
  
        const weekData = energyUsage.data.filter(
          (data) => new Date(data.timestamp) >= past7Days
        );
  
        for (const data of weekData) {
          const dataDate = new Date(data.timestamp);
          const dayOfWeek = dataDate.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  
          // Ensure we map Sunday to index 6, Monday to index 0, etc.
          const mappedDay = (dayOfWeek === 0) ? 6 : dayOfWeek - 1; // Map Sunday (0) to index 6, Monday (1) to index 0
  
          if (mappedDay >= 0 && mappedDay < 7) {
            energyData[mappedDay] += data.energyUsage; // Add the energy usage to the corresponding day of the week
          }
        }
      }
  
      const result = dayNames.map((day, index) => ({
        day: day,
        energyUsage: energyData[index],
      }));
  
      res.json(result);
    } catch (error) {
      console.error("Error fetching energy data:", error);
      res.status(500).json({ message: "Server error while fetching energy data" });
    }
  });
  

//get energy data for each week in a month
router.get("/energyData/month", verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const devices = await Device.find({ _id: { $in: user.devices } });
  
      const energyData = Array(4).fill(0); // Array to store energy data for 4 weeks
  
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const past4Weeks = new Date(today);
      past4Weeks.setDate(today.getDate() - 27); // Start from 4 weeks ago
  
      for (const device of devices) {
          const energyUsage = await EnergyUsage.findOne({ device: device._id }).sort({ "data.timestamp": -1 });
  
          const monthData = energyUsage.data.filter(
              (data) => new Date(data.timestamp) >= past4Weeks
          );
  
          for (const data of monthData) {
              const dataDate = new Date(data.timestamp);
              dataDate.setHours(0, 0, 0, 0); // Normalize timestamp to start of the day
              
              const weekDiff = Math.floor((dataDate - past4Weeks) / (1000 * 60 * 60 * 24 * 7));
  
              if (weekDiff >= 0 && weekDiff < 4) {
                  energyData[weekDiff] += data.energyUsage;
              }
          }
      }
  
      res.json(energyData);
    } catch (error) {
      console.error("Error fetching energy data:", error);
      res.status(500).json({ message: "Server error while fetching energy data" });
    }
  });


  //get energy data for energy production devices 

  //get energy dat for today in 3 hours interval
  router.get("/energyData/todayEG", verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const devices = await Device.find({ _id: { $in: user.devices } }); // Find all devices that belong to the user
      const energyData = Array(8).fill(0); // Array to store energy data for all devices
      for (const device of devices) {
        if (device.type === "Solar Panel") {
          const energyGenerated = await EnergyGenerated.findOne
          ({ device: device._id }).sort({ "data.timestamp": -1 }); // Find the latest energy data for the device
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const todayData = energyGenerated.data.filter(
            (data) => data.timestamp >= today
          );
          for (const data of todayData) {
            const hour = new Date(data.timestamp).getHours();
            if (hour >= 0 && hour < 3) {
              energyData[0] += data.energyGenerated;
            } else if (hour >= 3 && hour < 6) {
              energyData[1] += data.energyGenerated;
            } else if (hour >= 6 && hour < 9) {
              energyData[2] += data.energyGenerated;
            } else if (hour >= 9 && hour < 12) {
              energyData[3] += data.energyGenerated;
            } else if (hour >= 12 && hour < 15) {
              energyData[4] += data.energyGenerated;
            } else if (hour >= 15 && hour < 18) {
              energyData[5] += data.energyGenerated;
            } else if (hour >= 18 && hour < 21) {
              energyData[6] += data.energyGenerated;
            } else if (hour >= 21 && hour < 24) {
              energyData[7] += data.energyGenerated;
            }
          }
        }
      }
      res.json(energyData);
    } catch (error) {
      console.error("Error fetching energy data:", error);
      res.status(500).json({ message: "Server error while fetching energy data" });
    }
  }
  );

  // get energy data for last 7 days
  router.get("/energyData/weekEG", verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const devices = await Device.find({ _id: { $in: user.devices } }); // Find all devices that belong to the user
      const energyData = Array(7).fill(0); // Array to store energy data for all devices, initialized with 0
      const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
      for (const device of devices) {
        const energyGenerated = await EnergyGenerated.findOne({
          device: device._id,
        }).sort({ "data.timestamp": -1 }); // Find the latest energy data for the device
  
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const past7Days = new Date(today);
        past7Days.setDate(today.getDate() - 6); // 7 days ago
  
        const weekData = energyGenerated.data.filter(
          (data) => new Date(data.timestamp) >= past7Days
        );
  
        for (const data of weekData) {
          const dataDate = new Date(data.timestamp);
          const dayOfWeek = dataDate.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  
          // Ensure we map Sunday to index 6, Monday to index 0, etc.
          const mappedDay = (dayOfWeek === 0) ? 6 : dayOfWeek - 1; // Map Sunday (0) to index 6, Monday (1) to index 0
  
          if (mappedDay >= 0 && mappedDay < 7) {
            energyData[mappedDay] += data.energyGenerated; // Add the energy usage to the corresponding day of the week
          }
        }
      }
  
      const result = dayNames.map((day, index) => ({
        day: day,
        energyGenerated: energyData[index],
      }));
  
      res.json(result);
    } catch (error) {
      console.error("Error fetching energy data:", error);
      res.status(500).json({ message: "Server error while fetching energy data" });
    }
  });

//get energy data for each week in the last month
router.get("/energyData/monthEG", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const devices = await Device.find({ _id: { $in: user.devices } });

    const energyData = Array(4).fill(0); // Array to store energy data for 4 weeks

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const past4Weeks = new Date(today);
    past4Weeks.setDate(today.getDate() - 27); // Start from 4 weeks ago

    for (const device of devices) {
        const energyGenerated = await EnergyGenerated.findOne({ device: device._id }).sort({ "data.timestamp": -1 });

        const monthData = energyGenerated.data.filter(
            (data) => new Date(data.timestamp) >= past4Weeks
        );

        for (const data of monthData) {
            const dataDate = new Date(data.timestamp);
            dataDate.setHours(0, 0, 0, 0); // Normalize timestamp to start of the day
            
            const weekDiff = Math.floor((dataDate - past4Weeks) / (1000 * 60 * 60 * 24 * 7));

            if (weekDiff >= 0 && weekDiff < 4) {
                energyData[weekDiff] += data.energyGenerated;
            }
        }
    }

    res.json(energyData);
  } catch (error) {
    console.error("Error fetching energy data:", error);
    res.status(500).json({ message: "Server error while fetching energy data" });
  }
});

module.exports = router;