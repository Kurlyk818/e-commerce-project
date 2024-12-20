const Product = require('../models/Product')
const Order = require('../models/Order')

const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const {checkPermissions} = require('../utils')


const fakeStripeAPI = async ({amount, currency}) => {
    const client_secret = 'someRandomValue'
    return {client_secret, amount}
}


const createOrder = async (req, res) => {
    const {items: cartItems, tax, shippingFee} = req.body

    if(!cartItems || cartItems.length < 1) {
        throw new CustomError.BadRequestError('No cart items provided')
    }
    if(!tax || !shippingFee) {
        throw new CustomError.BadRequestError('Please provide tax and shipping fee')
    }

        let orderItems = []
        let subtotal = 0;
        for(const item of cartItems){
            const dbProduct = await Product.findOne({_id: item.product})
            if(!dbProduct){
                throw new CustomError.NotFoundError(`No product with id ${item.product}`)
            }
            const {name, price, image, _id} = dbProduct
            const singleOrderItem = {
                amount: item.amount,
                name,
                price,
                image,
                product: _id,
            }
            // add item to order
            orderItems = [...orderItems, singleOrderItem]
            // calculate subtotal
            subtotal += singleOrderItem.amount * singleOrderItem.price;
        }
        const total = subtotal + tax + shippingFee;

        //get client secret

        const paymentIntent = await fakeStripeAPI({
            amount: total,
            currency: 'usd',
        })

        const order = await Order.create({
            orderItems, total, subtotal, tax, shippingFee, clientSecret: paymentIntent.client_secret, user: req.user.userId
        })

        res.status(StatusCodes.CREATED).json({order, clientSecret: order.clientSecret})
}
const getAllOrders = async (req, res) => {

    res.status(200).json({ msg: 'get all orders' })
}

const getSingleOrder = async (req, res) => {

    res.status(200).json({ msg: 'get single order' })
}

const getCurrentUserOrders = async (req, res) => {

    res.status(200).json({ msg: 'get current User orders' })
}

const updateOrder = async (req, res) => {
        
        res.status(200).json({ msg: 'update order' })   
}


module.exports = {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder
}