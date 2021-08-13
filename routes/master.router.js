const Router = require('express')
const router = new Router()
const {postMaster, getMaster, getAvailableMasters, getAvailableMastersForUpdate, putMaster, deleteMaster} = require('../controller/master.controller')

router.post('/master', postMaster)
router.get('/master', getMaster)
router.get('/availableMasters', getAvailableMasters)
router.get('/availableMastersforUpdate', getAvailableMastersForUpdate)
router.put('/master', putMaster)
router.delete('/master', deleteMaster)



module.exports = router