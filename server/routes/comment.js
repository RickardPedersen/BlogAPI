const controller = require('../controllers/comment.js')
const {Router} = require('express')

const router = new Router()

router.get('/', controller.getAllComments)
router.get('/:id', controller.getComment)
router.post('/', controller.addComment)
router.patch('/:id', controller.editComment)
router.delete('/:id', controller.deleteComment)

module.exports = router
