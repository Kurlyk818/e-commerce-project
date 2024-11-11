


const getAllOrders = async (req, res) => {

    res.status(200).json({ msg: 'get all orders' })
}

const getSingleOrder = async (req, res) => {

    res.status(200).json({ msg: 'get single order' })
}

const getCurrentUserOrders = async (req, res) => {

    res.status(200).json({ msg: 'get current User orders' })
}

const createOrder = async (req, res) => {
    
        res.status(200).json({ msg: 'create order' })
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