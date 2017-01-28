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

	        const paymentId = payment.id
	        console.log(paymentId)
	        const payerId = redirect_link.replace('https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=', '')
	        console.log(payerId)
	        const execute_payment_json = {
	        	"payer_id": payerId,
			    "transactions": req.body.transactions.amount
	        }
	        paypal.payment.execute(paymentId, execute_payment_json,(error, payment) => {
			    if (error) {
			        console.log(error.response);
			        throw error;
			    } else {
			        console.log("Get Payment Response");
			        console.log(JSON.stringify(payment));
			    }
			});
	    }
	})

})

module.exports = router
