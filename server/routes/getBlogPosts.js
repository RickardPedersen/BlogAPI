const controller = require('../controllers/getBlogPosts.js')
const {Router} = require('express')

const router = new Router()

router.get('/blog', controller.resCallback)

module.exports = router

/*
app.get('/blog', async (req, res) => {
    try {
        let results = await db.posts.find({})
        
        if (results) {
            res.status(200).json(results)
        } else {
            res.status(404).send('Not Found')
        }  
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
})*/