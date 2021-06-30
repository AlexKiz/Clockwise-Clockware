const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')

router.post('/user', userController.postUser)
router.get('/user', userController.getUser)
router.put('/user', userController.putUser)
router.delete('/user', userController.deleteUser)



module.exports = router