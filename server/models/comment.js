const {comment, connect} = require('../database/dbSetup')
connect()

module.exports = {
    async clear() {
        try {
            await comment.collection.drop()
        } catch (error) {
            console.log(error)
        }
    },
    async count(filter) {
        try {
            return await comment.countDocuments(filter)
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async getAllComments(filter) {
        try {
            return await comment.find(filter)
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async getComment(id) {
        try {
            return await comment.findOne({ _id: id })
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async search(filter) {
        try {
            return await comment.find({text: filter})  
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async addComment(commentObject) {
        try {
            return await comment.create(commentObject)
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async editComment(id, updatedComment) {
        try {
            let updComment = await comment.updateOne({ _id: id }, { $set: updatedComment })
            return updComment.n
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async deleteComment(id) {
        try {
            let delComment = await comment.deleteOne({ _id: id })
            return delComment.n
        } catch (error) {
            console.log(error)
            return false
        }
    }
}
