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
            return await db.post.find(filter)
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async getPost(id) {
        try {
            return await db.post.findOne({ _id: id})
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async search(regex) {
        try {
            const searchQuery = {
                $or: [
                    { title: regex },
                    { content: regex }
                ]
            }
            return await db.post.find(searchQuery)
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async addPost(blogPost) {
        try {
            
            return await db.post.create(blogPost)
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
