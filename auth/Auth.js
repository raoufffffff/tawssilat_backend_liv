const experss = require('express')
const Livror = require('../models/livror.model')
const Auth = experss.Router()

Auth.post('/', async (req, res) => {
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

module.exports = Auth
