const express = require("express");
const router = express.Router();
const LeaderboardStats = require("../models/leaderboard"); // Import the leaderboard model

router.get("/leaderboard", async (req, res) => {
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

