const {Router} = require('express')
const transactions = require('./transactions')
const paypal = require('./paypal')

const router = Router()
router.use('/transactions', transactions)
router.use('/paypal', paypal)

module.exports = router
