const experss = require('express')
const FeedBack = require('../models/feed.model')
const FeedRoute = experss.Router()

FeedRoute.get('/', async (req, res) => {
    try {
        const result = await FeedBack.find()
        res.send({ good: true, result: result })
    } catch (error) {
        res.send({ good: false })
    }
})

FeedRoute.post('/', async (req, res) => {
    let { body } = req
    try {
        const result = await FeedBack.create(body)
        res.send({ good: true, result: result })
    } catch (error) {
        res.send({ good: false })
    }
})



FeedRoute.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await FeedBack.findByIdAndDelete(id)
        res.send({ good: true, result: result })
    } catch (error) {
        res.send({ good: false })
    }
})



module.exports = FeedRoute