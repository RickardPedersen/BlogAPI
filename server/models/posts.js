const db = require('../database/dbSetup')

module.exports = {
    async getAllPosts() {
        try {
            let result = await db.posts.find({})
            console.log(result)
            return result
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async getPost(id) {
        try {
            let blogPost = await db.posts.findOne({ _id: id})

            return blogPost 
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async addPost(blogPost) {
        try {
            await db.posts.insert(blogPost)

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async editPost(id, updatedPost) {
        try {
            let updPost = await db.posts.update({ _id: id },{ $set: updatedPost })

            return updPost
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async deletePost(id) {
        try {
            let delPost = await db.posts.remove({ _id: id })

            return delPost
            
        } catch (error) {
            console.log(error)
            return false
        }
    }
}