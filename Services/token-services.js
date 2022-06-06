const jwt = require("jsonwebtoken")
const Token = require("../models/Token")

class HashToken {
    generateToken(data) {
        const refreshToken = jwt.sign(data, process.env.REFRESH_SECRET_KEY, {
            expiresIn: "1y"
        })
        const accessToken = jwt.sign(data, process.env.ACCESS_SECRET_KEY, {
            expiresIn: '30m'
        })
        return { refreshToken, accessToken }
    }
    async storeRefreshToken(data) {
        return await Token.create(data)
    }
    verifyAccessToken(data) {
        return jwt.verify(data, process.env.ACCESS_SECRET_KEY)
    }
    verifyRefreshToken(data) {
        return jwt.verify(data, process.env.REFRESH_SECRET_KEY)
    }
    async updateRefreshToken(data) {
        return await Token.updateOne(data)
    }
    async findRefreshToken(data) {
        return await Token.findOne(data)
    }
    async removeToken(data) {
        return await Token.deleteOne(data)
    }
}

module.exports = new HashToken()