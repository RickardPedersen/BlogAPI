const model = require('../models/comment.js')

module.exports = {
    getAllComments: async (req, res) => {
        let results = []
        console.log(req.user.role)
        //const readAny = ac.can(req.user.role).readAny('comment');
        //const readOwn = ac.can(req.user.role).readOwn('comment');
        //console.log(permission.granted)

        if (req.user.role === 'admin') {
            results = await model.getAllComments({})
        } else if (req.user.role === 'user') {
            results = await model.getAllComments({userId: req.user.userId})
        } else {
            return res.sendStatus(403)
        }

        if (results) {
            res.status(200).json(results)
        } else {
            res.status(404).send('Not Found')
        } 
    },
    getComment: async (req, res) => {
        let comment = await model.getComment(req.params.id)

        if (comment) {
    
            console.log(comment)
            res.status(200).json(comment)
        } else {
            res.status(404).send('Not Found')
        } 
    },
    addComment: async (req, res) => {
        if (req.body.hasOwnProperty('text') &&
            req.body.hasOwnProperty('postId')
            ) {
            let comment = {
                text: req.body.text,
                postId: req.body.postId,
                userId: req.user.userId
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
        let comment = await model.getComment(req.params.id)
        if (!comment) { return res.sendStatus(404) }
        if (!req.user.owns(comment)) { return res.sendStatus(401) }

        if (req.body.hasOwnProperty('text')) {

            let updatedComment = {
                text: req.body.text
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
        let comment = await model.getComment(req.params.id)
        if (!comment) { return res.sendStatus(404) }
        if (!req.user.owns(comment)) { return res.sendStatus(401) }

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
