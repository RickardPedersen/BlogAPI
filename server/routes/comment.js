const controller = require('../controllers/comment.js')
const {Router} = require('express')
const {user} = require('../middlewares/authorization')

const router = new Router()

router.get('/', user, controller.getAllComments)
router.get('/:id', controller.getComment)
router.post('/', user, controller.addComment)
router.patch('/:id', user, controller.editComment)
router.delete('/:id', user, controller.deleteComment)

module.exports = router
