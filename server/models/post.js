const {post, connect} = require('../database/dbSetup')
connect()

module.exports = {
    async count(filter) {
        try {
            return await post.countDocuments(filter)
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async getAllPosts(filter) {
        try {
            return await post.find(filter)
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async getPost(id) {
        try {
            return await post.findOne({ _id: id})
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async search(regex) {
        const searchQuery = {
            $or: [
                { title: regex },
                { content: regex }
            ]
        }
        try {
            let test = await post.find(searchQuery)
            return test
        } catch (error) {
            return false
        }
    },
    async addPost(blogPost) {
        try {
            return await post.create(blogPost)
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async editPost(id, updatedPost) {
        try {
            let updPost = await post.updateOne({ _id: id },{ $set: updatedPost })
            return updPost.n
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async deletePost(id) {
        try {
            let delPost = await post.deleteOne({ _id: id })
            return delPost.n
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async clearAllPosts() {
        try {
            return await post.remove({})
        } catch (error) {
            return error
        }
    }
}
