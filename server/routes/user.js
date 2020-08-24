const controller = require('../controllers/user.js')
const {Router} = require('express')

const router = new Router()

router.get('/', controller.getAllUsers)
router.get('/:id', controller.getUser)
router.get('/:id/posts', controller.getUserPosts)
router.get('/:id/comments', controller.getUserComments)
router.post('/', controller.addUser)
router.patch('/:id', controller.editUser)
router.delete('/:id', controller.deleteUser)

module.exports = router
