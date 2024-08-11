const experss = require('express')
const Livror = require('../models/livror.model')
const LivrorRoute = experss.Router()


LivrorRoute.get('/', async (req, res) => {
    try {
        const result = await Livror.find()
        res.send({ good: true, result: result })
    } catch (error) {
        res.send({ good: false })
    }
})


LivrorRoute.post('/', async (req, res) => {
    let { body } = req
    body.cancelOrders = 0
    try {
        const result = await Livror.create(body)
        res.send({ good: true, result: result })
    } catch (error) {
        res.send({ good: false })
    }
})

LivrorRoute.put('/:id', async (req, res) => {
    const { id } = req.params
    let { body } = req
    try {
        const result = await Livror.findByIdAndUpdate(id, body)
        res.send({ good: true, result: result })
    } catch (error) {
        res.send({ good: false })
    }
})

LivrorRoute.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await Livror.findByIdAndDelete(id)
        res.send({ good: true, result: result })
    } catch (error) {
        res.send({ good: false })
    }
})

LivrorRoute.get('/find', async (req, res) => {
    let { email, password } = req.body
    try {
        const result = await Livror.findOne({ email: email })
        if (!result) {
            res.send({ good: false, email: false })
            return
        }
        if (result.password == password) {
            res.send({ good: true, result: result })
            return
        }
        res.send({ good: false, password: false })
    } catch (error) {
        res.send({ good: false })
    }
})

module.exports = LivrorRoute