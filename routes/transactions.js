const {Router} = require('express')
const router = Router()
const {Transaction} = require('../models')
let transactions = []

router.get('/', (req, res) => {
  Transaction.find()
  .then((data) => res.send(data))
  //res.send({ transactions })
})

router.get('/:id', (req, res) => {
  // [1,2,3,4,5].filter(x => x === 4)
  // const transaction = transactions.filter(t => t.id === +req.params.id)[0]
  // res.send(transaction)
  Transaction.findOne({_id: req.params.id})
  .then((data) => res.send(data))
})

router.post('/', (req, res) => {
  // req.checkBody('name', 'name is invalid').notEmpty().isAlpha()
  // req.sanitizeBody('name').toAlpha()
  // const errors = req.validationErrors()
  // if (errors) {
  //   return res.status(400).send({ errors })
  // }
  // req.body.id = transactions.reduce((prev ,cur) => Math.max(prev, cur.id), -1) + 1
  // transactions.push(req.body)
  // res.send({ transactions })

  const trans = new Transaction (req.body)
  trans.save()
  .then((data) => res.send(data))
})

router.put('/:id', (req, res) => {
  // const transaction = transactions.filter(t => t.id === +req.params.id)[0]
  // transaction.name = req.body.name
  // res.send(transaction)
  Transaction.update({_id: req.params.id}, req.body)
  .then((data) => res.send(data))
})

router.delete('/:id', (req, res) => {
  Transaction.remove({_id: req.params.id})
  .then(() => res.send({success: true}))
})



module.exports = router
