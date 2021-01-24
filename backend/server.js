const express = require('express')
const dotenv = require('dotenv')
const products = require('./data/products.js')
const connectDB = require('./config/db.js')

dotenv.config()

connectDB()

const app = express()

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/product/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id)
    res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))