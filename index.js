const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('./routes')
const expressValidator = require('express-validator')

const app = express()


mongoose.connect('mongodb://test01:qwerty@ds129469.mlab.com:29469/node-test')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressValidator());
app.use('/', routes)


app.listen('3000', () => console.log('listen in port 3000'))
