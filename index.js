const express = require('express')

const app = express()

const router = express.Router()

app.use('/', (req, res) => res.send('hello'))
router.get('/data', (req, res) => {
    const a = 1 + 2 + 3;  
    res.send({ data: a})
})

app.listen('3000', console.log('listen in port 3000'))
