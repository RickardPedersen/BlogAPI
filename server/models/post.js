const db = require('../database/dbSetup')

module.exports = {
    async count(filter) {
        try {
            return await db.post.countDocuments(filter)
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async getAllPosts(filter) {
        try {
            let result = await db.post.find(filter)
            //console.log(result)
            return result
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async getPost(id) {
        try {
            let blogPost = await db.post.findOne({ _id: id})

            return blogPost 
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async addPost(blogPost) {
        try {
            await db.post.create(blogPost)

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async editPost(id, updatedPost) {
        try {
            let updPost = await db.post.updateOne({ _id: id },{ $set: updatedPost })

            return updPost.n
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async deletePost(id) {
        try {
            let delPost = await db.post.deleteOne({ _id: id })

            return delPost.n
            
        } catch (error) {
            console.log(error)
            return false
        }
    }
}