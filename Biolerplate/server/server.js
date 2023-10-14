const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');
const progresRoutes = require('./routes/progresRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

mongoose
.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("database Connected"))
  .catch((err) => console.log("Not connected", err.message));


app.use('/api/users', userRoutes);
app.use('/api/assessments', authMiddleware, assessmentRoutes);
app.use('/api/progres', authMiddleware, progresRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
