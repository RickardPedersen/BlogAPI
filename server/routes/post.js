const controller = require('../controllers/post.js')
const {Router} = require('express')

const router = new Router()

router.get('/', controller.getAllPosts)
router.get('/:id', controller.getPost)
router.get('/:id/comments', controller.getPostComments)
router.post('/', controller.addPost)
router.patch('/:id', controller.editPost)
router.delete('/:id', controller.deletePost)

module.exports = router
