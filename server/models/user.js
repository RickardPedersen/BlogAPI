const jwt = require('jsonwebtoken')
const {user, connect} = require('../database/dbSetup')
connect()
const bcrypt = require('bcryptjs')

function createToken(payload) {
    return jwt.sign(payload, process.env.SECRET, { expiresIn:'1h' })
}

module.exports = {
    async clear() {
        try {
            await user.collection.drop()
        } catch (error) {
            console.log(error)
        }
    },
    async authenticate(username, password) {
        try {
            let userDoc = await user.findOne({username})
            if (!userDoc) {
                return {
                    success: false,
                    token: null,
                    error: 'wrong username'
                }
            }

            const correctPassword = bcrypt.compareSync(password, userDoc.password)
            if (correctPassword) {
                return {
                    success: true,
                    token: createToken({ userId: userDoc._id, role: userDoc.role }),
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
            is(userDoc) { return userDoc._id.toString() === this.userId },
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
    async addUser(userObject) {
        try {
            return await user.create(userObject)
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
    }
}
