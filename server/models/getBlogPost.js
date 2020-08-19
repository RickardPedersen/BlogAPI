const db = require('../database/dbSetup')

module.exports = {
    async get(id) {
        try {
            let blogPost = await db.posts.findOne({ _id: id})
            let comments = await db.comments.find({ blogPostId: id})

            return {blogPost, comments}

            
        } catch (error) {
            console.log(error)
            return false
        }
    }
}