const controller = require('../controllers/comment.js')
const {Router} = require('express')
const {auth, checkUserId} = require('../middlewares/authorization')

const router = new Router()

router.get('/', controller.getAllComments)
router.get('/:id', controller.getComment)
router.post('/', auth, controller.addComment)
router.patch('/:id', auth, checkUserId, controller.editComment)
router.delete('/:id', auth, checkUserId, controller.deleteComment)

module.exports = router
