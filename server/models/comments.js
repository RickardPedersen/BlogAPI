const db = require('../database/dbSetup')

module.exports = {
    async getAllComments() {
        try {
            let result = await db.comments.find({})
            console.log(result)
            return result
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async getComment(id) {
        try {
            let comment = await db.comments.findOne({ _id: id })

            return  comment

            
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async addComment(comment) {
        try {
            await db.comments.insert(comment)

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async editComment(id, updatedComment) {
        try {
            let updComment = await db.comments.update({ _id: id }, { $set: updatedComment })

            return updComment
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async deleteComment(id) {
        try {
            let delComment = await db.comments.remove({ _id: id })

            return delComment
            
        } catch (error) {
            console.log(error)
            return false
        }
    }
}