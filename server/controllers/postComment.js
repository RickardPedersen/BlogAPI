const {post} = require('../models/postComment.js')

module.exports = {
    resCallback: async (req, res) => {
        if ( req.body.hasOwnProperty('blogPostId') &&
            req.body.hasOwnProperty('name') &&
            req.body.hasOwnProperty('comment') &&
            typeof req.body.blogPostId === 'string'&&
            typeof req.body.name === 'string' &&
            typeof req.body.comment === 'string'
        ) {
            let comment = {
                blogPostId: req.body.blogPostId,
                name: req.body.name,
                comment: req.body.comment
            }

            let success = await post(comment)

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






// app.post('/blog/comment/post', async (req, res) => {
//     try {
//         if (req.body.hasOwnProperty('blogPostId') &&
//             req.body.hasOwnProperty('name') &&
//             req.body.hasOwnProperty('comment') &&
//             typeof req.body.blogPostId === 'string'&&
//             typeof req.body.name === 'string' &&
//             typeof req.body.comment === 'string'
//             ) {
//                 let comment = {
//                     blogPostId: req.body.blogPostId,
//                     name: req.body.name,
//                     comment: req.body.comment
//                 }

//                 let newComment = await db.comments.insert(comment)

//                 res.status(201).send('Created')
//             } else {
//                 res.status(400).send('Bad Request')
//             }
//     } catch (error) {
//         console.log(error)
//         res.status(500).send('Internal Server Error')
//     }
// })