const fs = require("fs");

function checkId(id) {
  const numCheck = Number(id.substring(1));
  if (isNaN(numCheck)) {
    throw new Error("Parameter is not a number");
  }
}

function logRequest(req, res, next) {
  const timeOfRequest = new Date(Date.now()).toUTCString();
  const method = req.method;
  const url = req.url;
  const requestInfo = method + " " + url + " " + timeOfRequest + "\n";
  fs.appendFileSync("./log.txt", requestInfo);
  next();
}

module.exports = { checkId, logRequest };
