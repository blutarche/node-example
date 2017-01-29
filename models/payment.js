const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  id: String,
  intent: String,
  state: String,
  payer: Object,
  transactions: Object,
  create_time: Date,
  links: Object,
  httpStatusCode: Number
})

module.exports = mongoose.model('Payment', schema)