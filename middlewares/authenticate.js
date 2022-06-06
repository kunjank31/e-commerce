const CustomErrorHandler = require("../ErrorHandler/CustomErrorHandler")
const tokenServices = require("../Services/token-services")

const authenticate = (req, res, next) => {
  const { accessToken } = req.cookies
  try {
    const data = tokenServices.verifyAccessToken(accessToken)
    req.id = data.id
    req.isAdmin = data.isAdmin
    return next()
  } catch (error) {
    return res.status(401).json(CustomErrorHandler.unAuthorized())
  }
}

module.exports = authenticate