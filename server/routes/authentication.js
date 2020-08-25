const controller = require('../controllers/authentication.js')
const {Router} = require('express')
//const auth = require('../middlewares/authorization')

const router = new Router()

router.post('/login', controller.login)
//router.delete?('/logout', )

module.exports = router
