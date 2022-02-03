const express = require("express");
const Item = require("./items-model");
const { validateItem } = require('./items-middleware');

const router = express.Router();

 const {restricted} = require('../auth/auth-middleware')


router.get("/", restricted, async (req, res, next) => {
  try {
    const food = await Item.find();
    res.json(food);
  } catch (err) {
    next(err);
  }
})


// if item is not listed it responds with a blank array with a code 200

router.get('/:id', restricted, (req, res, next) => {
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

// when new item posted needs to contain the current user_id
// add a item verification if item already exists


router.post('/', restricted, validateItem, (req, res, next) => {
  Item.add(req.body, req.decodedJwt.subject)
      .then(newitem => {
          res.status(201).json({message: `Item has been added`, newitem, info: req.decodedJwt.subject })
      })
      .catch(next)
})



router.put('/:id', restricted, validateItem, (req, res, next) => {
    Item.edit(req.params.id, req.body)
      .then(edited => {
        res.json(edited)
      })
      .catch(next)
})


router.delete('/:id', (req, res, next) => {
  Item.del(req.params.id)
  .then(() => res.status(200).json({message:`item with id ${req.params.id} was sucessfully deleted`}))
  .catch(() => res.status(500).json({message:`item with id ${req.params.id} was not able to be deleted`}))
    
})

module.exports = router;

