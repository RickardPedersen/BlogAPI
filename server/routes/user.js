const controller = require('../controllers/user.js')
const {Router} = require('express')
const {user} = require('../middlewares/authorization')

const router = new Router()

router.get('/', user, controller.getAllUsers)
router.get('/:id', controller.getUser)
router.get('/:id/posts', controller.getUserPosts)
router.get('/:id/comments', controller.getUserComments)
router.post('/', controller.addUser)
router.patch('/:id', user, controller.editUser)
router.delete('/:id', user, controller.deleteUser)

module.exports = router
