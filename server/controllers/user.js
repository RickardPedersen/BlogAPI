const model = require('../models/user.js')
const { getAllComments } = require('../models/comment')
const { getAllPosts } = require('../models/post')
const bcrypt = require('bcryptjs')

function hashPassword(password) {
    return bcrypt.hashSync(password, 10)
}

module.exports = {
    getAllUsers: async (req, res) => {
        let results = await model.getAllUsers()

        if (results) {
            res.status(200).json(results)
        } else {
            res.status(404).send('Not Found')
        } 
    },
    getUser: async (req, res) => {

        let user = await model.getUser({ _id: req.params.id })

        if (user) {
    
            console.log(user)
            res.status(200).json(user)
        } else {
            res.status(404).send('Not Found')
        } 
    },
    getUserPosts: async (req, res) => {
        let posts = await getAllPosts({ userId: req.params.id })

        if (posts) {
            res.status(200).json(posts)
        } else {
            res.status(404).send('Not Found')
        }
    },
    getUserComments: async (req, res) => {
        let comments = await getAllComments({ userId: req.params.id })

        if (comments) {
            res.status(200).json(comments)
        } else {
            res.status(404).send('Not Found')
        }
    },
    addUser: async (req, res) => {
        if (req.body.hasOwnProperty('username') &&
            req.body.hasOwnProperty('password') &&
            req.body.hasOwnProperty('role')
            ) {
            let user = {
                username: req.body.username,
                password: hashPassword(req.body.password),
                role: req.body.role
            }
            console.log(user)

            let success = await model.addUser(user)

            if (success) {
                res.status(201).send('Created')
            } else {
                res.status(500).send('Something went wrong')
            }
        } else {
            res.status(400).send('Bad Request')
        } 
    },
    editUser: async (req, res) => {
        let user = await model.getUser({ _id: req.params.id })
        if (!user) { return res.sendStatus(404) }
        if (!req.user.is(user)) { return res.sendStatus(401) }

        if (req.body.hasOwnProperty('username') ||
            req.body.hasOwnProperty('password') 
            ) {
            let updatedUser = {}

            if (req.body.hasOwnProperty('username')) {
                updatedUser.username = req.body.username
            }
            if (req.body.hasOwnProperty('password')) {
                updatedUser.password = hashPassword(req.body.password)
            }

            let updUser = await model.editUser(req.params.id, updatedUser)

            if (updUser === 0) {
                res.status(404).send('Not Found')
            } else if (updUser === 1) {
                res.status(200).send('OK')
            } else {
                res.status(500).send('Something went wrong')
            }
        } else {
            res.status(400).send('Bad Request')
        }
    },
    deleteUser: async (req, res) => {
        let user = await model.getUser({ _id: req.params.id })
        console.log(user)
        if (!user) { return res.sendStatus(404) }
        if (!req.user.is(user)) { return res.sendStatus(401) }

        let delPost = await model.deleteUser(req.params.id)

        if (delPost === 0) {
            res.status(404).send('Not Found')
        } else if (delPost === 1) {
            res.status(200).send('OK')
        } else {
            res.status(500).send('Something went wrong')
        }
    }
}
