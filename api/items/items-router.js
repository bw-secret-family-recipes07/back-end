const express = require('express')
const Items = require('./items-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Items.find()
      .then(items => {
        res.json(items)
      })
      .catch(next)
  })

  module.exports = router