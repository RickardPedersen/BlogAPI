const db = require('../database/dbSetup')

module.exports = {
    async count(filter) {
        try {
            return await db.comment.countDocuments(filter)
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async getAllComments(filter) {
        try {
            return await db.comment.find(filter)
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async getComment(id) {
        try {
            return await db.comment.findOne({ _id: id })
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async search(regex) {
        const searchQuery = { text: regex }
        console.log(searchQuery)
        try {
            return await db.comment.find(searchQuery)  
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async addComment(comment) {
        try {
            return db.comment.create(comment)
            // return true
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async editComment(id, updatedComment) {
        try {
            let updComment = await db.comment.updateOne({ _id: id }, { $set: updatedComment })
            return updComment.n
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async deleteComment(id) {
        try {
            let delComment = await db.comment.deleteOne({ _id: id })
            return delComment.n
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async clearAllComments () {
        try {
            return await db.comment.remove({})
        } catch (error) {
            return error
        }
    }
}
