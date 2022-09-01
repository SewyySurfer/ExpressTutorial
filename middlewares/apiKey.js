const ErrorHandler = require("../errors/ErrorHandler");

function apiKey(req, res, next) {
  const api_key = "1234567"; //global api key
  console.log(req.query.api_key);
  const userApiKey = req.query.api_key;
  if (userApiKey && userApiKey === api_key) {
    // checking if api_key exist and if exist then it is equal to our api_key i.e., 1234567 or not.
    next();
  } else {
    next(ErrorHandler.forbidden("api key is not valid"));
  }
}

module.exports = apiKey;
