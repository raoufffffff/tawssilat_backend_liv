const experss = require('express')
const Order = require('../models/order.model')
const orderRoute = experss.Router()


orderRoute.get('/', async (req, res) => {
    try {
        const orders = await Order.find({ LivrorShow: true, cancel: false, complate: false, livrorOK: false })
        res.send({ good: true, result: orders, length: orders.length })
    } catch (error) {
        res.send({ error: error, good: false })
    }
})

orderRoute.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const orders = await Order.findById(id)
        res.send({ good: true, result: orders, length: orders.length })
    } catch (error) {
        res.send({ error: error, good: false })
    }
})

orderRoute.get('/all', async (req, res) => {
    try {
        const orders = await Order.find()
        orders.forEach(async (e) => {
            await Order.findByIdAndDelete(e.id)
        })
        res.send({ good: true, result: orders, length: orders.length })
    } catch (error) {
        res.send({ error: error, good: false })
    }
})





orderRoute.put('/git/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req
    try {
        let orders = await Order.findById(id)
        if (orders.livrorOK) {
            res.send({ good: false, message: "already taken" })
            return
        }
        let result = await Order.findByIdAndUpdate(id, body)
        res.send({ good: true, result: result })
    } catch (error) {
        res.send({ error: error, good: false })
    }
})

orderRoute.put('/take/:id', async (req, res) => {
    const { id } = req.params
    try {
        let result = await Order.findByIdAndUpdate(id, { livrorTakefrom: true })
        res.send({ good: true, result: result })
    } catch (error) {
        res.send({ error: error, good: false })
    }
})

orderRoute.put('/delivred/:id', async (req, res) => {
    const { id } = req.params
    try {
        let result = await Order.findByIdAndUpdate(id, { complate: true })
        res.send({ good: true, result: result })
    } catch (error) {
        res.send({ error: error, good: false })
    }
})

orderRoute.put('/refused/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req
    try {
        let result = await Order.findByIdAndUpdate(id, { cancel: true, whoCancel: "livror", whyCancel: body.message })
        res.send({ good: true, result: result })
    } catch (error) {
        res.send({ error: error, good: false })
    }
})

orderRoute.put('/ref/:id', async (req, res) => {
    const { id } = req.params
    try {
        let result = await Order.findByIdAndUpdate(id, { livrorTake: false, livrorOK: false })
        res.send({ good: true, result: result })
    } catch (error) {
        res.send({ error: error, good: false })
    }
})


module.exports = orderRoute