const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('./routes')
const expressValidator = require('express-validator')
const paypal = require('paypal-rest-sdk')
const port = process.env.PORT || 3000;
const configDB = require('./credentials/mongolab.js');
const paypalCredential = require('./credentials/paypal.js');

const app = express()

mongoose.connect(configDB.url)
paypal.configure({
	'mode': 'sandbox',
	'client_id': paypalCredential.client_id,
	'client_secret': paypalCredential.client_secret 
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressValidator());
app.use('/', routes)


app.listen(port, () => console.log('listen in port '+port))
