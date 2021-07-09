const Router = require('express')
const router = new Router()
const orderController = require('../controller/order.controller')

router.post('/order', orderController.postOrder)
router.get('/order', orderController.getOrder)
router.get('/clocksize', orderController.getClockSize)
router.put('/order', orderController.putOrder)
router.delete('/order', orderController.deleteOrder)


module.exports = router