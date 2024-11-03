const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')


const getAllUsers = async (req, res) => {
    res.send('all users')
}


const getSingleUser = async (req, res) => {
    res.send('single user')
}


const showCurrentUser = async (req, res) => {
    res.send('show Current User')
}


const updateUser = async (req, res) => {
    res.send('update User')
}



const updateUserPassword = async (req, res) => {
    res.send('update user password')
}



module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}