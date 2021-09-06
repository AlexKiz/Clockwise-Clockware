const Router = require('express')
const router = new Router()
const {postOrder, getClocks} = require('../controller/order.controller')
const {postOrderValidate} = require('../controller/order.validate')


router.post('/order', [postOrderValidate], postOrder)
router.get('/clocks', getClocks)


module.exports = router 