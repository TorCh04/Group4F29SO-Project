const express = require("express");
const router = express.Router();
const LeaderboardStats = require("../models/LeaderboardStats"); // Import the leaderboard model

router.post("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await LeaderboardStats.find({});
    console.log("Fetched Leaderboard Data:", leaderboard); // Debugging output
    res.json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;

