const model = require('../models/comment.js')

module.exports = {
    getAllComments: async (req, res) => {
        let filter = {}
        let results = await model.getAllComments(filter)

        if (results) {
            res.status(200).json(results)
        } else {
            res.status(404).send('Not Found')
        } 
    },
    getComment: async (req, res) => {
        let comments = await model.getComment(req.params.id)

        if (comments) {
    
            console.log(comments)
            res.status(200).json(comments)
        } else {
            res.status(404).send('Not Found')
        } 
    },
    addComment: async (req, res) => {
        if (req.body.hasOwnProperty('name') &&
            req.body.hasOwnProperty('comment') &&
            req.body.hasOwnProperty('blogPostId') &&
            typeof req.body.name === 'string'&&
            typeof req.body.blogPostId === 'string'&&
            typeof req.body.comment === 'string'
            ) {
            let comment = {
                name: req.body.name,
                comment: req.body.comment,
                blogPostId: req.body.blogPostId
            }

            let success = await model.addComment(comment)

            if (success) {
                res.status(201).send('Created')
            } else {
                res.status(500).send('Something went wrong')
            }
        } else {
            res.status(400).send('Bad Request')
        } 
    },
    editComment: async (req, res) => {
        if (req.body.hasOwnProperty('name') &&
            req.body.hasOwnProperty('comment') &&
            typeof req.body.name === 'string'&&
            typeof req.body.comment === 'string'
            ) {

            let updatedComment = {
                name: req.body.name,
                comment: req.body.comment
            }

            let updPost = await model.editComment(req.params.id, updatedComment)

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
    deleteComment: async (req, res) => {
        let delcomment = await model.deleteComment(req.params.id)

        if (delcomment === 0) {
            res.status(404).send('Not Found')
        } else if (delcomment === 1) {
            res.status(200).send('OK')
        } else {
            res.status(500).send('Something went wrong')
        }
    }
}