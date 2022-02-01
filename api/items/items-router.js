const express = require('express')
const Items = require('./items-model')

const router = express.Router()

router.get('/', (req, res, next) => {
try{
const stuff = req.body
console.log(stuff)
}
catch (err){
  console.log(err)
}
  })

  module.exports = router