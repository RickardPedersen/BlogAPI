const db = require('../database/dbSetup')

module.exports = {
    async get() {
        try {
            let result = await db.posts.find({})
            console.log(result)
            return result
        } catch (error) {
            console.log(error)
            return false
        }
    }
}
