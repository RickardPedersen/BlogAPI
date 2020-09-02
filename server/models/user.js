const jwt = require('jsonwebtoken')
const {user, connect} = require('../database/dbSetup')
connect()
//const { verify } = require('jsonwebtoken')

module.exports = {
    async getAllUsers() {
        try {
            return await user.find({})
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async verifyToken(token) {
        const payload = jwt.verify(token, process.env.SECRET)
        return {
            ...payload,
            owns(document) { return document.userId === this.userId },
            is(user) { return user._id.toString() === this.userId },
            isAdmin() { return this.role === 'admin' }
        }
    },
    async getUser(filter) {
        try {
            return await user.findOne(filter)
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async getPostOwner (post) {
        try {
            return await user.findOne({_id: post.userId})
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async getCommentOwner (comment) {
        try {
            return await user.findOne({_id: comment.userId})
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async addUser(newUser) {
        try {
            return await user.create(newUser)
            // return true
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async editUser(id, updatedUser) {
        try {
            let updPost = await user.updateOne({ _id: id },{ $set: updatedUser })
            return updPost.n
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async deleteUser(id) {
        try {
            let delUsers = await user.deleteOne({ _id: id })
            return delUsers.n
            
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async clearAllUsers () {
        return await user.remove({})
    },
    async searchUser(regex) {
        const searchQuery = {
            $or: [
                { title: regex },
                { content: regex }
            ]
        }
        try {
            return await user.find(searchQuery)
        } catch (error) {
            console.log(error)
            return false
        }
    },
}
