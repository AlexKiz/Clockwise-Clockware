const Router = require('express')
const router = new Router()
const cityController = require('../controller/city.controller')

router.post('/city', cityController.postCity)
router.get('/city', cityController.getCity)
router.put('/city', cityController.putCity)
router.delete('/city', cityController.deleteCity)



module.exports = router