const controller = require('../controllers/postBlogPost.js')
const {Router} = require('express')

const router = new Router()

router.post('/blog/post', controller.resCallback)

module.exports = router

/*
app.post('/blog/post', async (req, res) => {
    try {

        if (req.body.hasOwnProperty('title') &&
            req.body.hasOwnProperty('content') &&
            typeof req.body.title === 'string'&&
            typeof req.body.content === 'string'
            ) {
            let blogPost = {
                title: req.body.title,
                content: req.body.content
            }

            let newPost = await db.posts.insert(blogPost)
            res.status(201).send('Created')
        } else {
            res.status(400).send('Bad Request')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
})*/