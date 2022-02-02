const express = require("express");
const Items = require("./items-model");

const router = express.Router();

const {restricted} = require('../auth/auth-middleware')

router.get("/",restricted, async (req, res, next) => {
  try {
    const food = await Items.find();
    res.json(food);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
