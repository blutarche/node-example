const {Router} = require('express')
const paypal = require('paypal-rest-sdk')

const router = Router()

router.get('/', (req,res) => res.send({success: true}))

router.get('/payment', (req,res) => res.send({success: true}))

router.post('/payment/create', (req, res) =>{
	const create_payment_json = req.body
	paypal.payment.create(create_payment_json, (error, payment) => {
	    if (error) {
	        throw error;
	    } else {
	        console.log("Create Payment Response")
	        const redirect_link = payment.links.filter(link => link.rel === 'approval_url')[0].href
	        const execute_link = payment.links.filter(link => link.rel === 'execute')[0].href
	        console.log(payment)
	        console.log('redirecting to '+ redirect_link)
	        res.redirect(payment.httpStatusCode, redirect_link)       
	    }
	})

})

router.get('/payment/execute', (req, res) => {
	const paymentId = req.query.paymentId
    console.log(paymentId)
    const payerId = req.query.PayerID
    console.log(payerId)
    const execute_payment_json = {
    	"payer_id": payerId
    }
    paypal.payment.execute(paymentId, execute_payment_json,(error, payment) => {
	    if (error) {
	        console.log(error.response)
	        throw error
	    } else {
	        console.log("Get Payment Response")
	        res.send(payment)
	    }
	})
})

module.exports = router
