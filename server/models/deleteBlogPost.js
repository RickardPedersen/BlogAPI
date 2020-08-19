const db = require('../database/dbSetup')

module.exports = {
    async deletePost(id) {
        try {
            let delPost = await db.posts.remove({ _id: id })

            return delPost
            
        } catch (error) {
            console.log(error)
            return false
        }
    }
}