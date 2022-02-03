function validateItem(req, res, next ) {
    const { item_name, source, ingredients, instructions, category, user_id } = req.body
        if(
            !item_name|| !item_name.trim() || 
            !source || !source.trim() || 
            !ingredients || !ingredients.trim() || 
            !  instructions || !instructions.trim() || 
            !category || !category.trim() || 
            !user_id || !user_id.trim())
            {
                res.status(400).json({
                message: 'all fields are required'
            })
        }else {
            next()
        }
        
}

module.exports = {
    validateItem
}