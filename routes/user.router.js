const Router = require('express')
const router = new Router()
const {postUser, getUser, putUser, deleteUser} = require('../controller/user.controller')

router.post('/user', postUser)
router.get('/user', getUser)
router.put('/user', putUser)
router.delete('/user', deleteUser)



module.exports = router