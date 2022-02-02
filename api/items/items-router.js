const express = require("express");
const Item = require("./items-model");
const { validateItem } = require('./items-middleware');

const router = express.Router();

// const {restricted} = require('../auth/auth-middleware')
//restricted, -->add this middleware back into router.get

router.get("/", async (req, res, next) => {
  try {
    const food = await Item.find();
    res.json(food);
  } catch (err) {
    next(err);
  }
})

router.get('/:id', (req, res, next) => {
  const {id} = req.params
  Item.findById(id)
      .then(item => {
          if (!item) {
              return next({ status: 404, message: `could not find item with id ${id}`})
          }
          res.status(200).json(item)
      })
      .catch(next)
})

router.post('/',  (req, res, next) => {
  Item.add(req.body)
      .then(newitem => {
          res.status(201).json(newitem)
      })
      .catch(next)
})

router.put('/', (req, res, next) => {
  // Item.edit()
})
//   Item.edit(req.body
//       .then(edited => {
//           res.status(202).json(edited)
//       })
//       .catch(next)
// )

router.delete('/:id', (req, res, next) => {
  Item.del(req.params.id)
  .then(() => res.status(200).json({message:`item with id ${req.params.id} was sucessfully deleted`}))
  .catch(() => res.status(500).json({message:`item with id ${req.params.id} was not able to be deleted`}))
    
})

module.exports = router;

