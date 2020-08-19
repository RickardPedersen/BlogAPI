const {get} = require('../models/getBlogPost.js')

module.exports = {
    resCallback: async (req, res) => {
        let { blogPost, comments } = await get(req.params.id)

        if (blogPost) {
            let resObj = {
                blogPost,
                comments
            }
    
            console.log(resObj)
            res.status(200).json(resObj)
        } else {
            res.status(404).send('Not Found')
        } 
    }
}