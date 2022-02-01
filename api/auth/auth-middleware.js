const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets/index");

const restricted = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      next({ status: 401, message: "Please Log In" });
    } else {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          next({ status: 401, message: `There is something wrong with your token` });
        } else {
          req.decodedJwt = decoded;
          next();
        }
      });
    }
  };

  module.exports = {
    restricted
  };