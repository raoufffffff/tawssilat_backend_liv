const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const orderRoute = require('./routes/order.route');
const FeedRoute = require('./routes/FeedBack.route');
const LivrorRoute = require('./routes/livror.route');
const Auth = require('./auth/Auth');

const app = express()
app.use(cors());
app.use(express.json())
app.use('/order', orderRoute)
app.use('/feed', FeedRoute)
app.use('/liv', LivrorRoute)
app.use('/auth', Auth)


app.get('/', (req, res) => {
    res.send("hello world")
})



app.listen(3010, () => console.log("Server ready on port 3000."));

mongoose
    .connect("mongodb+srv://raouf:rabah@cluster0.ayejlxj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("mriglla")

    })
    .catch(err => console.log(err))

module.exports = app;