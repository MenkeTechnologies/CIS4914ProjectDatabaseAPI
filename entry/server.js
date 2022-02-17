const helmet = require("helmet");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const projectDBUtil = require("../util/projectDBUtil");

const projectTopicPostRoute = require('../routes/ProjectTopicPostRoute')

const log = projectDBUtil.log;
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use('/posts', projectTopicPostRoute);

mongoose.connect(projectDBUtil.MONGODB_CONN_STRING, { useUnifiedTopology: true, useNewUrlParser: true });

mongoose.connection.once('open', () => {
  log.info(`---- MongoDB database connection established successfully`);
})

app.listen(process.env.PORT || projectDBUtil.PORT, () => {
  log.info("---- Server is running on Port: " + projectDBUtil.PORT);
});
