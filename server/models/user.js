const db = require('../database/dbSetup')

module.exports = {
    async getAllUsers() {
        try {
            let result = await db.user.find({})
            console.log(result)
            return result
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async getUser(filter) {
        try {
            let user = await db.user.findOne(filter)

            return user 
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async addUser(user) {
        try {
            await db.user.create(user)

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async editUser(id, updatedUser) {
        try {
            let updPost = await db.user.updateOne({ _id: id },{ $set: updatedUser })

            return updPost.n
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async deleteUser(id) {
        try {
            let delUsers = await db.user.deleteOne({ _id: id })

            return delUsers.n
            
        } catch (error) {
            console.log(error)
            return false
        }
    }
}
