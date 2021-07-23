const Router = require('express')
const router = new Router()
const {postCity, getCity, putCity, deleteCity} = require('../controller/city.controller')

router.post('/city', postCity)
router.get('/city', getCity)
router.put('/city', putCity)
router.delete('/city', deleteCity)



module.exports = router