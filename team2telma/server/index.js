const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const teamRoutes = require('./routes/teamRoutes');
const leaderboardRouter = require('./routes/leaderboard'); // Add this line

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.use('/api/teams', teamRoutes);
app.use('/api/leaderboard', leaderboardRouter); // Add this line

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
