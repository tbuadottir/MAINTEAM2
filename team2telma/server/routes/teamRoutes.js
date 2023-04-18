const router = require('express').Router();
const Team = require('../models/teamModel');

router.route('/').post(async (req, res) => {
  const { teamName, timeStamp, clueNumber } = req.body;

  try {
    const existingTeam = await Team.findOne({ teamName, clueNumber });
    if (existingTeam) {
      return res.status(400).json({ message: 'You have already submitted for this clue number.' });
    }

    const newTeam = new Team({ teamName, timeStamp, clueNumber });
    await newTeam.save();

    res.status(201).json(newTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
