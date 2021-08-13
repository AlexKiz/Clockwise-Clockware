const Router = require('express')
const router = new Router()
const {Auth, isAuth} = require('../controller/auth.controller')

router.post('/login', Auth)
router.get('/login', isAuth)

module.exports = router