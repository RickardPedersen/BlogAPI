const controller = require('../controllers/getBlogPost.js')
const {Router} = require('express')

const router = new Router()

router.get('/blog/:id', controller.resCallback)

module.exports = router

/*
app.get('/blog/:id', async (req, res) => {
    try {
        let blogPost = await db.posts.findOne({ _id: req.params.id})
        let comments = await db.comments.find({ blogPostId: req.params.id})

        if (blogPost) {
            let resObj = {
                blogPost,
                comments
            }
    
            res.status(200).json(resObj)
        } else {
            res.status(404).send('Not Found')
        }   
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
})*/