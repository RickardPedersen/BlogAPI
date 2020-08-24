const db = require('../database/dbSetup')

module.exports = {
    async getAllComments(filter) {
        try {
            let result = await db.comment.find(filter)
            console.log(result)
            return result
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async getComment(id) {
        try {
            let comment = await db.comment.findOne({ _id: id })

            return  comment

            
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async addComment(comment) {
        try {
            await db.comment.create(comment)

            return true
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
    }
}