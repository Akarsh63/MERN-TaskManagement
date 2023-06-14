const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const tasksRouter = require('./routes/tasks.js');
require("dotenv").config();
app.get('/', (req, res) => res.send('/tasks ---> for tasks data'));
const corsOptions = {
  origin: "https://mern-taskmanagementappclient.onrender.com" 
}
app.use(express.json());
app.use(cors(corsOptions));

app.use('/tasks', tasksRouter);

mongoose.connect(process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(async () => {
  console.log('Connected to MongoDB');});

const PORT = process.env.PORT || 8083
app.listen(PORT, () => {
      console.log(`App is Listening on PORT ${PORT}`);
})
