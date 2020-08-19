const db = require('../database/dbSetup')

module.exports = {
    async post(blogPost) {
        try {
            await db.posts.insert(blogPost)

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}