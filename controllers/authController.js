
const register = async (req, res) => {
    
}
const login = async (req, res) => {

}
const logout = async (req, res) => {
  res.status(200).json({
    msg: 'User logged out',
  })
}


module.exports = {
    register,
    login,
    logout,
}
