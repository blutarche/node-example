const {Router} = require('express')
const paypal = require('paypal-rest-sdk')

const router = Router()

router.get('/', (req,res) => res.send({success: true}))

router.get('/payment', (req,res) => res.send({success: true}))

router.post('/payment/create', (req, res) =>{
	const create_payment_json = req.body
	paypal.payment.create(create_payment_json, function (error, payment) {
	    if (error) {
	        throw error;
	    } else {
	        console.log("Create Payment Response")
	        //const redirect_link = payment.links.filter(link => link.rel === 'approval_url')[0].href
	        // const execute_link = payment.links.filter(link => link.rel === 'execute')[0].href
	        console.log(payment)
	        console.log('redirecting to '+payment.links[1].href)
	        res.redirect(payment.httpStatusCode, payment.links[1].href)
	    }
	})

})

module.exports = router