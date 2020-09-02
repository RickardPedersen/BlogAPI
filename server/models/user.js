const jwt = require('jsonwebtoken')
const db = require('../database/dbSetup')
const bcrypt = require('bcryptjs')

function createToken(payload) {
    return jwt.sign(payload, process.env.SECRET, { expiresIn:'1h' })
}

module.exports = {
    async authenticate(username, password) {
        try {
            let user = await db.user.findOne({username})
            if (!user) {
                return {
                    success: false,
                    token: null,
                    error: 'wrong username'
                }
            }

            const correctPassword = bcrypt.compareSync(password, user.password)
            if (correctPassword) {
                return {
                    success: true,
                    token: createToken({ userId: user._id, role: user.role }),
                    error: null
                }
            } else {
                return {
                    success: false,
                    token: null,
                    error: 'wrong password'
                }
            }
        } catch (error) {
            console.log(error)
            return {
                success: false,
                token: null,
                error: 'server error'
            }
        }
    },
    async getAllUsers() {
        try {
            return await db.user.find({})
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
            return await db.user.findOne(filter)
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async getPostOwner (post) {
        try {
            return await db.user.findOne({_id: post.userId})
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async getCommentOwner (comment) {
        try {
            return await db.user.findOne({_id: comment.userId})
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async addUser(user) {
        try {
            return await db.user.create(user)
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
