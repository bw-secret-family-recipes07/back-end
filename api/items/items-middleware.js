function validateItem(req, res, next ) {
    const { title, source, ingredients, instructions, category } = req.body
        if(
            !title|| !title.trim() || 
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


module.exports = {
    validateItem
}