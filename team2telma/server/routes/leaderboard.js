const express = require('express');
const router = express.Router();
const Team = require('../models/teamModel');

router.get('/', async (req, res) => {
  try {
    const leaderboardData = await Team.aggregate([
      {
        $group: {
          _id: '$teamName',
          clues: { $addToSet: '$clueNumber' },
          lastTimeStamp: { $max: { $toDate: "$timeStamp" } },
        },
      },
      {
        $project: {
          _id: 0,
          teamName: '$_id',
          totalClues: { $size: '$clues' },
          latestTimestamp: "$lastTimeStamp",
        },
      },
    ]);

    const sortedLeaderboardData = leaderboardData.sort((a, b) => {
      if (a.totalClues === b.totalClues) {
        return a.latestTimestamp.getTime() - b.latestTimestamp.getTime();
      } else {
        return b.totalClues - a.totalClues;
      }
    });
    console.log('Sorted Leaderboard Data:', sortedLeaderboardData);
    res.json(sortedLeaderboardData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

});


module.exports = router;
