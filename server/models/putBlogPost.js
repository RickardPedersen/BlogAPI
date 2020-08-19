const db = require('../database/dbSetup')

module.exports = {
    async put(id, updatedPost) {
        try {
            let updPost = await db.posts.update({ _id: id }, updatedPost)

            return updPost
        } catch (error) {
            console.log(error)
            return false
        }
    }
}