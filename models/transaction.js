const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  cost: Number,
  date: Date,
  info: String,
  type: String
})

module.exports = mongoose.model('Transaction', schema)
