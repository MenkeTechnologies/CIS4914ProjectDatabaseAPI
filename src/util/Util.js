/**
 * @file Utility functions
 */

const jsonwebtoken = require('jsonwebtoken');
const creds = require('../../secret.json')

const MONGODB_CONN_STRING = creds.connection;
const PORT = 4000;
const secret = 'secret';
const audience = 'http://myapi/protected';
const issuer = 'http://issuer';
const AUTHOR = "author";
const POST_TYPE = "postType"
const SENDER = "sender";
const RECIPIENT = "recipient";

/**
 * JSON response object
 * @param msg
 * @returns {{msg}}
 */
const successMsg = (msg) => ({
  msg
})
const errorMsg = (msg) => ({
  msg
})

const Logger = require('pretty-logger');
Logger.setLevel("info");
/**
 * Logger config
 * @type {{showMillis: boolean, debug: string, showTimestamp: boolean, error: string[], info: string}}
 */
const customConfig = {
  showMillis: true,
  showTimestamp: true,
  info: "green",
  error: ["bgRed", "bold"],
  debug: "rainbow"
};
const log = new Logger(customConfig);

/**
 * Logging of url and body wrapper
 * @param req
 * @param res
 * @returns {(function(*, *): void)}
 */
const handleClosure = (req, res) =>
  (err, data) => {
    log.info(`url ${JSON.stringify(req.originalUrl)} params ${JSON.stringify(req.params)} body: ${JSON.stringify(req.body)}`)
    logErrorOrJson(err, data, res);
  };

/**
 * error log JSON body
 * @param obj
 */
const logError = (obj) => {
  log.error(JSON.stringify(obj))
}

/**
 * Send client error response or JSON string response
 * @param err
 * @param data
 * @param res
 */
const logErrorOrJson = (err, data, res) => {
  if (err) {
    logError(err);
    res.status(400).send(errorMsg(err))
  } else {
    res.json(data)
  }
};

/**
 * authenthication middleware
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const authMiddleware = (req, res, next) => {
  log.info('token attempting to verify');
  const token = req.header('auth-token');
  log.info(token);
  if (!token) {
    return res.status(401).send(errorMsg('Access Denied'));
  }
  log.info(token);
  try {
    const verified = jsonwebtoken.verify(token, secret);
    log.info(verified);
    req.user = verified;
    next();
  } catch (err) {
    logError(err)
    res.status(400).send(errorMsg('Invalid Token'));
  }
}

/**
 * create JWT function
 * @param email
 * @returns {*}
 */
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
  PORT,
  AUTHOR,
  POST_TYPE,
  SENDER,
  RECIPIENT,
  logErrorOrJson,
  logError,
  handleClosure
}
