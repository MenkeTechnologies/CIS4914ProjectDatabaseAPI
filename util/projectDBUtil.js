const jsonwebtoken = require('jsonwebtoken');
const jwt = require('express-jwt');
const projectDBUtil = require("../util/projectDBUtil");
const creds = require('../secret.json')

const MONGODB_CONN_STRING = creds.connection;
const PROFILE_API_PREFIX = '/cis4914_project';
const USER_API_PREFIX = '/cis4914_user';
const POST_API_PREFIX = '/cis4914_post';
const PORT = 4000;
const secret = 'secret';
const audience = 'http://myapi/protected';
const issuer = 'http://issuer';

const successMsg = (msg) => ({
    msg
})
const errorMsg = (msg) => ({
    msg
})

// const authMiddleware = () => jwt({
//     secret: secret,
//     // audience: audience,
//     // issuer: issuer,
//     algorithms: ["HS256"]
// });

const Logger = require('pretty-logger');
Logger.setLevel("info");
const customConfig = {
  showMillis: true,
  showTimestamp: true,
  info: "green",
  error: ["bgRed", "bold"],
  debug: "rainbow"
};
const log = new Logger(customConfig);

const authMiddleware = (req, res, next) => {
  log.info('token attempting to verify');
  const token = req.header('auth-token');
  log.info(token);
  if (!token) {
    return res.status(401).send(projectDBUtil.errorMsg('Access Denied'));
  }
  log.info(token);
  try {
    const verified = jsonwebtoken.verify(token, secret);
    log.info(verified);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send(projectDBUtil.errorMsg('Invalid Token'));
  }
}

const createToken = (email) => {
  log.info("createToken called");
  const token = jsonwebtoken.sign({email}, secret,
    {
      audience: audience,
      issuer: issuer
    }
  );
  log.info("createToken complete");
  return token;
};

module.exports = {
  log,
  authMiddleware,
  createToken,
  successMsg,
  errorMsg,
  secret,
  audience,
  issuer,
  MONGODB_CONN_STRING,
  PROFILE_API_PREFIX,
  USER_API_PREFIX,
  POST_API_PREFIX,
  PORT
}
