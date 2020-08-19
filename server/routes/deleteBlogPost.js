const controller = require('../controllers/deleteBlogPost.js')
const {Router} = require('express')

const router = new Router()

router.delete('/blog/delete/:id', controller.resCallback)

module.exports = router




// app.delete('/blog/delete/:id', async (req, res) => {
//     try {
//         let delPost = await db.posts.remove({ _id: req.params.id })
    
//         if (delPost !== 0) {
//             res.status(200).send('OK')
//         } else {
//             res.status(404).send('Not Found')
//         } 
//     } catch (error) {
//         console.log(error)
//         res.status(500).send('Internal Server Error')
//     }
// })