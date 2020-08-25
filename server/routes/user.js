const controller = require('../controllers/user.js')
const {Router} = require('express')
const {auth, checkUserId} = require('../middlewares/authorization')

const router = new Router()

router.get('/', controller.getAllUsers)
router.get('/:id', controller.getUser)
router.get('/:id/posts', controller.getUserPosts)
router.get('/:id/comments', controller.getUserComments)
router.post('/', controller.addUser)
router.patch('/:id', auth, checkUserId, controller.editUser)
router.delete('/:id', auth, checkUserId, controller.deleteUser)

module.exports = router
