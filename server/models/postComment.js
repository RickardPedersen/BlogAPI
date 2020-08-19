const db = require('../database/dbSetup')

module.exports = {
    async post(comment) {
        try {
            await db.comments.insert(comment)

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}