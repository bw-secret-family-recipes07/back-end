const bcrypt = require("bcryptjs");
const makeToken = require("./auth-token-builder");
const router = require("express").Router();
const User = require("../users/users-model");
const { BCRYPT_ROUNDS } = require("../secrets/index");

router.post("/register", (req, res, next) => {
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

router.get('/logout', (req, res) => {
  if (req.session.username) {
    req.session.destroy((err) => {
      if (err) {
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
