const Item = require('./items-model');


function validateItem(req, res, next ) {
    const { item_name, source, ingredients, instructions, category } = req.body
        if(
            !item_name|| !item_name.trim() || 
            !source || !source.trim() || 
            !ingredients || !ingredients.trim() || 
            !  instructions || !instructions.trim() || 
            !category || !category.trim())
            {
                res.status(400).json({
                message: 'all fields are required'
            })
        }else {
            next()
        }
        
}

async function verifyDeleteItem(req, res, next) {
    const deleteId = req.params.id
    const itemToDel = await Item.findById(deleteId)
    if(!itemToDel) {
        res.json({message: `Item with id ${deleteId} does not exist`}
        )
    }else {
        next()
    }
}


module.exports = {
    validateItem, 
    verifyDeleteItem
}