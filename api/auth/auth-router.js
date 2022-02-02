const bcrypt = require("bcryptjs");
const makeToken = require("./auth-token-builder");
const router = require("express").Router();
const User = require("../users/users-model");
const { BCRYPT_ROUNDS } = require("../secrets/index");

const {validateUserId} = require('../auth/auth-middleware')

router.post("/register",validateUserId, (req, res, next) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS);
  user.password = hash;
  User.add(user)
    .then((saved) => {
      res.status(201).json({ message: `Great to have you, ${saved.username}` });
    })
    .catch(next);
});

router.post("/login", (req, res, next) => {
  let { username, password } = req.body;
  User.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = makeToken(user);
        res
          .status(200)
          .json({ message: `Welcome back ${user.username}...`, token });
      } else {
        next({ status: 401, message: "Invalid Credentials" });
      }
    })
    .catch(next);
});


module.exports = router;
