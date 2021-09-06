const Router = require('express')
const router = new Router()
const {postCity, getCity, putCity, deleteCity} = require('../controller/city.controller')


router.get('/city', getCity)


module.exports = router 