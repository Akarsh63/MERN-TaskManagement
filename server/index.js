const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const tasksRouter = require('./routes/tasks.js');
require("dotenv").config();
app.get('/', (req, res) => res.send('/tasks ---> for tasks data'));
app.use(express.json());
app.use(cors());
app.use('/tasks', tasksRouter);

mongoose.connect(
    "mongodb+srv://akarsh:akarsh@taskmanagementapplicati.qoniiwm.mongodb.net/taskmanagementdatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(async () => {
  console.log('Connected to MongoDB');});

const port = 8083;

app.listen(process.env.PORT || port, () => console.log(`Server running on port ${port}`));
