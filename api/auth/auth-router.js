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
      const addedUser = await User.add(newUser);
      res.status(200).json({ message: `Welcome, ${addedUser.username}` });
    } catch (err) {
      next(err);
    }
  })

  router.post("/login", (req, res, next) => {
    let { username, password } = req.body;
    User.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = makeToken(user);
        res.status(200).json({ message: `${user.username} is back!`, token });
      } else {
        next({ status: 401, message: "invalid credentials" });
      }
    })
    .catch(next);
  });

  router.get('/logout', (req, res) => {
    if (req.session.user) {
      req.session.destroy((err) => {
        if (err) {
          // set a new cookie in THE PAST
          res.set('Set-Cookie', 'monkey=bar')
          res.json({ message: `sorry, could you retry` })
        } else {
          res.json({ message: `bye, it was awesome` })
        }
      })
    } else {
      res.json({ message: `I do not believe we have met?` })
    }
  })
module.exports = router;
