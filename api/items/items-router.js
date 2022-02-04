const express = require("express");
const Item = require("./items-model");
const { validateItem, verifyDeleteItem } = require('./items-middleware');

const router = express.Router();

 const { restricted } = require('../auth/auth-middleware')


router.get("/", restricted, async (req, res, next) => {
  try {
    const food = await Item.find();
    res.status(200).json(food);
  } catch (err) {
    next(err);
  }
})


router.get('/search', restricted, (req, res, next) => {
  let {title} = req.body
  Item.findBy({title})
  .then(item => {
    res.json(item)
  })
  .catch(next)

})
 


router.post('/', restricted, validateItem, (req, res, next) => {
  Item.add(req.body, req.decodedJwt.subject)
      .then(newitem => {
          res.status(201).json({message: `Item has been added`, newitem, Uploaded_by_User_ID: req.decodedJwt.subject})
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


router.delete('/:id', verifyDeleteItem,(req, res, next) => {
  Item.del(req.params.id)
  .then(() => res.status(200).json({message:`item with id ${req.params.id} was sucessfully deleted`}))
  .catch(() => res.status(500).json({message:`item with id ${req.params.id} was not able to be deleted`}))
    
})

module.exports = router;

