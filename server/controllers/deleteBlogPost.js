const {deletePost} = require('../models/deleteBlogPost.js')

module.exports = {
    resCallback: async (req, res) => {
        let delPost = await deletePost(req.params.id)

        if (delPost === 0) {
            res.status(404).send('Not Found')
        } else if (delPost === 1) {
            res.status(200).send('OK')
        } else {
            res.status(500).send('Something went wrong')
        }
    }
}


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