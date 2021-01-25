const express = require('express')
const asyncHandler = require('express-async-handler')
const route = express.Router()
const Product = require('../models/productModel.js')


// @desc  Fetch all Products
// @route  GET /api/products
// @access  Public
route.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json(products)
}))


// @desc  Fetch single Product
// @route  GET /api/products/:id
// @access  Public
route.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
}))

module.exports = route