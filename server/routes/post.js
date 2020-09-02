const controller = require('../controllers/post.js')
const {Router} = require('express')
const {user, admin} = require('../middlewares/authorization')

const router = new Router()

router.get('/', user, controller.getAllPosts)
router.get('/search', user, controller.searchPosts)
router.get('/:id', controller.getPost)
router.get('/:id/comments', controller.getPostComments)
router.post('/', user, controller.addPost)
router.patch('/:id', user, controller.editPost)
router.delete('/:id', user, controller.deletePost)

module.exports = router
