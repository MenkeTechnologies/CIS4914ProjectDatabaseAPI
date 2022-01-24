const helmet = require("helmet");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const vntUtil = require("../util/vntUtil");

const profileRoutes = require("../profile/routes");
const loginRoutes = require("../login/routes");
const postRoutes = require("../post/routes");

app.use(cors());

app.use(helmet());
app.use(bodyParser.json());

mongoose.connect(vntUtil.MONGODB_CONN_STRING, {useUnifiedTopology: true, useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function () {
  console.log(`---- MongoDB database connection established successfully`);
})

app.use(vntUtil.PROFILE_API_PREFIX, profileRoutes);
app.use(vntUtil.USER_API_PREFIX, loginRoutes);
app.use(vntUtil.POST_API_PREFIX, postRoutes);

app.listen(process.env.PORT || vntUtil.PORT, function () {
  console.log("---- Server is running on Port: " + vntUtil.PORT);
});
