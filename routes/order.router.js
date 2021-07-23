const Router = require('express')
const router = new Router()
const {postOrder, getOrder, getClocks, putOrder, deleteOrder} = require('../controller/order.controller')

router.post('/order', postOrder)
router.get('/order', getOrder)
router.get('/clocks', getClocks)
router.put('/order', putOrder)
router.delete('/order', deleteOrder)


module.exports = router