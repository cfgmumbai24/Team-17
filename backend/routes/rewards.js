const express = require("express");
const { ClerkExpressWithAuth } = require("@clerk/clerk-sdk-node");
const router = express.Router();
const User = require("../models/User");
const Reward = require("../models/rewards");

router.post("/update-rewards", ClerkExpressWithAuth(), async (req, res) => {
  try {
    if (!req.auth) {
      console.log("No JWT token received in request");
      return res.status(401).send("Unauthorized");
    }

    const { phone_no } = req.auth.sessionClaims;
    console.log("User phone no extracted from JWT:", phone_no);

    let user = await User.findOne({ phoneNo: phone_no });

    if (user) {
      let reward = await Reward.findOne({ user: user._id });
      if (!reward) {
        reward = new Reward({ user: user._id, points: 0 });
      }

      // Update the reward points
      reward.points += req.body.points;
      await reward.save();

      return res.status(200).send("Rewards updated successfully");
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Failed to update rewards:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/leaderboard", async (req, res) => {
  try {
    // Fetch reward information sorted by points in descending order
	console.log("heyy")
    let rewardInfo = await Reward.find();
	console.log(rewardInfo)

    // Format the rewardInfo to include username
    let leaderboard = rewardInfo.map(reward => ({
      username: reward.username,
      points: reward.points,
      status: reward.status
    }));

    return res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Failed to fetch leaderboard:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
