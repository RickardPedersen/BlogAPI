const controller = require('../controllers/post.js')
const {Router} = require('express')
const {auth, checkUserId} = require('../middlewares/authorization')

const router = new Router()

router.get('/', controller.getAllPosts)
router.get('/:id', controller.getPost)
router.get('/:id/comments', controller.getPostComments)
router.post('/', auth, controller.addPost)
router.patch('/:id', auth, checkUserId, controller.editPost)
router.delete('/:id', auth, checkUserId, controller.deletePost)

module.exports = router
