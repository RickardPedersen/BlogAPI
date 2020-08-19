const {post} = require('../models/postBlogPost.js')

module.exports = {
    resCallback: async (req, res) => {
        


        if (req.body.hasOwnProperty('title') &&
            req.body.hasOwnProperty('content') &&
            typeof req.body.title === 'string'&&
            typeof req.body.content === 'string'
            ) {
            let blogPost = {
                title: req.body.title,
                content: req.body.content
            }

            let success = await post(blogPost)

            if (success) {
                res.status(201).send('Created')
            } else {
                res.status(500).send('Something went wrong')
            }

            //let newPost = await db.posts.insert(blogPost)
        } else {
            res.status(400).send('Bad Request')
        } 
    }
}