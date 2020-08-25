const controller = require('../controllers/comment.js')
const {Router} = require('express')
const {auth, checkCommentUserId} = require('../middlewares/authorization')

const router = new Router()

router.get('/', controller.getAllComments)
router.get('/:id', controller.getComment)
router.post('/', auth, controller.addComment)
router.patch('/:id', auth, checkCommentUserId, controller.editComment)
router.delete('/:id', auth, checkCommentUserId, controller.deleteComment)

module.exports = router
