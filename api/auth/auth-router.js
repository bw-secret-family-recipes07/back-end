const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require('../users/users-model')
const { BCRYPT_ROUNDS } = require("../secrets/index");
const makeToken = require("./auth-token-builder");


router.post("/register", async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS);
      const newUser = { username, password: hash };
      const addedUser = await Jokes.add(newUser);
      res.status(200).json({ message: `Welcome, ${addedUser.username}` });
    } catch (err) {
      next(err);
    }
  })

module.exports = router;
