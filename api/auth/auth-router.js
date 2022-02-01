const bcrypt = require('bcryptjs')
const makeToken = require('./auth-token-builder')
const router = require('express').Router()
const User = require('../users/users-model')
const { BCRYPT_ROUNDS } = require('../secrets/index')


router.post('/register', (req, res, next) => {
    let user = req.body

    const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS)

    user.password = hash
  
    User.add(user)
      .then(saved => {
        res.status(201).json({ message: `Great to have you, ${saved.username}` })
      })
      .catch(next) 
  })

module.exports = router