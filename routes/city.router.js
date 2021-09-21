const Router = require('express')
const router = new Router()
const {getCity} = require('../controller/city.controller')


router.get('/city', getCity)


module.exports = router 