const {Router} = require('express')
const transactions = require('./transactions')

const router = Router()
router.use('/transactions', transactions)

module.exports = router
