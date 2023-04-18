const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  timeStamp: { type: Date, required: true },
  clueNumber: { type: Number, required: true },
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
