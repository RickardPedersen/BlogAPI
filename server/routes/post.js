const controller = require('../controllers/post.js')
const {Router} = require('express')
const {auth, checkPostUserId} = require('../middlewares/authorization')

const router = new Router()

router.get('/', auth, controller.getAllPosts)
router.get('/:id', controller.getPost)
router.get('/:id/comments', controller.getPostComments)
router.post('/', auth, controller.addPost)
router.patch('/:id', auth, checkPostUserId, controller.editPost)
router.delete('/:id', auth, checkPostUserId, controller.deletePost)

module.exports = router
