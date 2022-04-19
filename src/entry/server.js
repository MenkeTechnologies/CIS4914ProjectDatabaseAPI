/**
 * @file API entry point
 */
const helmet = require("helmet");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const projectRoutes = require('../routes/ProjectPostRoutes');
const seekingRoutes = require('../routes/SeekingPostRoutes');
const userRoutes = require('../routes/UserRoutes');
const messageRoutes = require('../routes/MessageRoutes');
const {log, MONGODB_CONN_STRING, PORT} = require("../util/Util");

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use('/project-post', projectRoutes);
app.use('/seeking-post', seekingRoutes);
app.use('/user', userRoutes);
app.use('/message', messageRoutes);

mongoose.connect(MONGODB_CONN_STRING, {useUnifiedTopology: true, useNewUrlParser: true});

mongoose.connection.once('open', () => log.info(`---- MongoDB database connection established successfully`));

app.listen(process.env.PORT || PORT, () => {
  log.info("---- Server is running on Port: " + PORT);
});
