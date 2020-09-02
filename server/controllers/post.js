const model = require('../models/post.js')
const { getAllComments } = require('../models/comment')

module.exports = {
    searchPosts: async (req, res) => {
        const regex = new RegExp(req.query.query, 'i')
        let results = await model.search(regex)
        if (results) {
            res.status(200).json(results)
        } else {
            res.sendStatus(404)
        }
    },
    getAllPosts: async (req, res) => {
        let results = []
        if (req.user.role === 'admin') {
            results = await model.getAllPosts({})
        } else if(req.user.role === 'user'){
            results = await model.getAllPosts({userId: req.user.userId})
        } else {
            return res.sendStatus(403)
        }
        
        if (results) {
            res.status(200).json(results)
        } else {
            res.status(404).send('Not Found')
        } 
    },
    getPost: async (req, res) => {
        let blogPost = await model.getPost(req.params.id)

        if (blogPost) {
    
            res.status(200).json(blogPost)
        } else {
            res.status(404).send('Not Found')
        } 
    },
    getPostComments: async (req, res) => {
        let comments = await getAllComments({ postId: req.params.id })

        if (comments) {
            res.status(200).json(comments)
        } else {
            res.status(404).send('Not Found')
        }
    },
    addPost: async (req, res) => {
        if (req.body.hasOwnProperty('title') &&
            req.body.hasOwnProperty('content')
            ) {
            let blogPost = {
                title: req.body.title,
                content: req.body.content,
                userId: req.user.userId
            }
            //console.log(req.user)

            let newPost = await model.addPost(blogPost)

            res.status(201).json(newPost)
            // if (typeof success === 'object') {
            // } else {
            //     res.status(500).send('Something went wrong')
            // }
        } else {
            res.status(400).send('Bad Request')
        } 
    },
    editPost: async (req, res) => {
        let blogPost = await model.getPost(req.params.id)
        if (!blogPost) { return res.sendStatus(404) }
        if (!req.user.owns(blogPost)) { return res.sendStatus(401) }

        if (req.body.hasOwnProperty('title') ||
            req.body.hasOwnProperty('content')
            ) {

            let updatedPost = {}

            if (req.body.hasOwnProperty('title')) {
                updatedPost.title = req.body.title
            }

            if (req.body.hasOwnProperty('content')) {
                updatedPost.content = req.body.content
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
        let blogPost = await model.getPost(req.params.id)
        if (!blogPost) { return res.sendStatus(404) }
        if (!req.user.owns(blogPost)) { return res.sendStatus(401) }

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
