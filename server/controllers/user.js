const model = require('../models/user.js')
const { getAllComments } = require('../models/comment')
const { getAllPosts } = require('../models/post')

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
        let blogPost = await model.getUser(req.params.id)

        if (blogPost) {
    
            console.log(blogPost)
            res.status(200).json(blogPost)
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
            typeof req.body.username === 'string'&&
            typeof req.body.password === 'string'
            ) {
            let user = {
                username: req.body.username,
                password: req.body.password,
            }

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
        if (req.body.hasOwnProperty('username') &&
            req.body.hasOwnProperty('password') &&
            typeof req.body.username === 'string'&&
            typeof req.body.password === 'string'
            ) {

            let updatedUser = {
                username: req.body.username,
                password: req.body.password
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
