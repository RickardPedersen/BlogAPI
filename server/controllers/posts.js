const model = require('../models/posts.js')
const { getAllComments } = require('../models/comments')

module.exports = {
    getAllPosts: async (req, res) => {
        let results = await model.getAllPosts()

        if (results) {
            res.status(200).json(results)
        } else {
            res.status(404).send('Not Found')
        } 
    },
    getPost: async (req, res) => {
        let blogPost = await model.getPost(req.params.id)

        if (blogPost) {
    
            console.log(blogPost)
            res.status(200).json(blogPost)
        } else {
            res.status(404).send('Not Found')
        } 
    },
    getPostComments: async (req, res) => {
        let comments = await getAllComments({ blogPostId: req.params.id })

        if (comments) {
            res.status(200).json(comments)
        } else {
            res.status(404).send('Not Found')
        }
    },
    addPost: async (req, res) => {
        if (req.body.hasOwnProperty('title') &&
            req.body.hasOwnProperty('content') &&
            typeof req.body.title === 'string'&&
            typeof req.body.content === 'string'
            ) {
            let blogPost = {
                title: req.body.title,
                content: req.body.content
            }

            let success = await model.addPost(blogPost)

            if (success) {
                res.status(201).send('Created')
            } else {
                res.status(500).send('Something went wrong')
            }
        } else {
            res.status(400).send('Bad Request')
        } 
    },
    editPost: async (req, res) => {
        if (req.body.hasOwnProperty('title') &&
            req.body.hasOwnProperty('content') &&
            typeof req.body.title === 'string'&&
            typeof req.body.content === 'string'
            ) {

            let updatedPost = {
                title: req.body.title,
                content: req.body.content
            }

            let updPost = await model.editPost(req.params.id, updatedPost)

            if (updPost === 0) {
                res.status(404).send('Not Found')
            } else if (updPost === 1) {
                res.status(200).send('OK')
            } else {
                res.status(500).send('Something went wrong')
            }
        } else {
            res.status(400).send('Bad Request')
        }
    },
    deletePost: async (req, res) => {
        let delPost = await model.deletePost(req.params.id)

        if (delPost === 0) {
            res.status(404).send('Not Found')
        } else if (delPost === 1) {
            res.status(200).send('OK')
        } else {
            res.status(500).send('Something went wrong')
        }
    }
}
