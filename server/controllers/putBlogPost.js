const {put} = require('../models/putBlogPost.js')

module.exports = {
    resCallback: async (req, res) => {


        if (req.body.hasOwnProperty('title') &&
            req.body.hasOwnProperty('content') &&
            typeof req.body.title === 'string'&&
            typeof req.body.content === 'string'
            ) {

            let updatedPost = {
                title: req.body.title,
                content: req.body.content
            }

            let updPost = await put(req.params.id, updatedPost)

            if (updPost === 0) {
                res.status(404).send('Not Found')
            } else if (updPost === 1) {
                res.status(200).send('OK')
            } else {
                res.status(500).send('Something went wrong')
            }
        } else {
            res.status(400).send('Bad Request')
        }
    }
}