const {Router} = require('express')
const router = Router()

router.get('/', (req,res) => res.send({success: true}))

module.exports = router