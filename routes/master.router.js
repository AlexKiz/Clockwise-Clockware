const Router = require('express')
const router = new Router()
const {postMaster, getMaster, getAvailableMasters, putMaster, deleteMaster} = require('../controller/master.controller')

router.post('/master', postMaster)
router.get('/master', getMaster)
router.get('/availableMasters', getAvailableMasters)
router.put('/master', putMaster)
router.delete('/master', deleteMaster)



module.exports = router