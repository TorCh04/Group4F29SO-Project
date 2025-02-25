const mongoose = require("mongoose");

const LeaderboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  avatar: { type: String, default: "https://via.placeholder.com/150" },
  points: { type: Number, default: 0 },
});

module.exports = mongoose.model("LeaderboardStats", LeaderboardSchema, "leaderboard_stats");

