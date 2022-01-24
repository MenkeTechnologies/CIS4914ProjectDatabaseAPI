const helmet = require("helmet");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const projectDBUtil = require("../util/projectDBUtil");

const profileRoutes = require("../profile/routes");
const loginRoutes = require("../login/routes");
const postRoutes = require("../post/routes");

app.use(cors());

app.use(helmet());
app.use(bodyParser.json());

mongoose.connect(projectDBUtil.MONGODB_CONN_STRING, {useUnifiedTopology: true, useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function () {
  console.log(`---- MongoDB database connection established successfully`);
})

app.use(projectDBUtil.PROFILE_API_PREFIX, profileRoutes);
app.use(projectDBUtil.USER_API_PREFIX, loginRoutes);
app.use(projectDBUtil.POST_API_PREFIX, postRoutes);

app.listen(process.env.PORT || projectDBUtil.PORT, function () {
  console.log("---- Server is running on Port: " + projectDBUtil.PORT);
});
