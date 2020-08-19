const controller = require('../controllers/putBlogPost.js')
const {Router} = require('express')

const router = new Router()

router.put('/blog/put/:id', controller.resCallback)

module.exports = router

/*
app.put('/blog/put/:id', async (req, res) => {
    try {

        if (req.body.hasOwnProperty('title') &&
            req.body.hasOwnProperty('content') &&
            typeof req.body.title === 'string'&&
            typeof req.body.content === 'string'
            ) {

            let updatedPost = {
                title: req.body.title,
                content: req.body.content
            }
            
            let updPost = await db.posts.update({ _id: req.params.id }, updatedPost)

            if (updPost !== 0) {
                res.status(200).send('OK')
            } else {
                res.status(404).send('Not Found')
            }
        } else {
            res.status(400).send('Bad Request')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
})*/