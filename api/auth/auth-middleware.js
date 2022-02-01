const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets/index");
const User = require('../users/users-model')

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

  async function validateUserId(req, res, next) {
    try {
      const username = await User.getById(req.body.username)
      if (!username) {
        res.status(404).json({
          message: 'user not found'
        }) 
      } else {
        req.username = username
        next()
      }
    } catch (err) {
      res.status(500).json({ 
        message: "problem finding user"
      })
    }
  }

  module.exports = {
    restricted,
    validateUserId
  };