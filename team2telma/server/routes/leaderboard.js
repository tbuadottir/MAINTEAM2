const express = require('express');
const router = express.Router();
const Team = require('../models/teamModel');

router.get('/', async (req, res) => {
  try {
    const leaderboardData = await Team.aggregate([
      {
        $group: {
          _id: '$teamName',
          totalClues: { $sum: 1 },
          lastTimeStamp: { $max: '$timeStamp' },
        },
      },
      {
        $project: {
          _id: 0,
          teamName: '$_id',
          totalClues: 1,
          latestTimestamp: { $toDate: { $toString: "$lastTimeStamp" } },
        },
      },
      { $sort: { totalClues: -1, lastTimeStamp: 1 } },
    ]);

    res.json(leaderboardData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
