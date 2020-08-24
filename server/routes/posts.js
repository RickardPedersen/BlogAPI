const controller = require('../controllers/posts.js')
const {Router} = require('express')

const router = new Router()

router.get('/', controller.getAllPosts)
router.get('/:id', controller.getPost)
router.post('/', controller.addPost)
router.patch('/:id', controller.editPost)
router.delete('/:id', controller.deletePost)

module.exports = router
