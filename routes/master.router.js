const Router = require('express')
const router = new Router()
const masterController = require('../controller/master.controller')

router.post('/master', masterController.postMaster)
router.get('/master', masterController.getMaster)
router.put('/master', masterController.putMaster)
router.delete('/master', masterController.deleteMaster)



module.exports = router