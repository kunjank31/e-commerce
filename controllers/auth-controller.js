const CustomErrorHandler = require("../ErrorHandler/CustomErrorHandler")
const userServices = require("../Services/user-services")
const UserDto = require("../Dtos/user-dto")
const passwordServices = require("../Services/password-services")
const tokenServices = require("../Services/token-services")
const User = require("../models/User")

class AuthController {
    // REGISTER USER
    async register(req, res, next) {
        const { name, email, password, username, address, image, phone } = req.body

        try {
            const existsEmail = await userServices.findUser({ email })
            if (existsEmail) {
                return res.status(406).json(CustomErrorHandler.alreadyExists())
            }
            const hashedPassword = await passwordServices.hashPass(password)
            const data = await userServices.createUser({ name, email, password: hashedPassword, username, address, image, phone })
            const userDto = new UserDto(data)
            res.status(201).json(userDto)
        } catch (error) {
            next(error)
        }

    }
    // LOGIN USER
    async login(req, res, next) {
        const { email, password } = req.body
        try {
            // check the field is not empty
            if (!email || !password) {
                return res.status(400).json(CustomErrorHandler.allFieldsRequired())
            }
            // find the user
            const user = await userServices.findUser({ email })
            if (!user) {
                return res.status(404).json(CustomErrorHandler.notFound())
            }
            // hash the password 
            const verifyHashedPassword = await passwordServices.verifyPass(password, user.password)

            if (!verifyHashedPassword) {
                return res.status(404).json(CustomErrorHandler.notFound())
            }
            // generate the token
            const { refreshToken, accessToken } = tokenServices.generateToken({ id: user._id, isAdmin: user.isAdmin })
            // store the token into database
            await tokenServices.storeRefreshToken({ token: refreshToken, userId: user._id })

            // set Cookies

            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            })
            res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            })

            const userDto = new UserDto(user)
            return res.status(200).json({ ...userDto, auth: true })

        } catch (error) {
            next(error)
        }
    }

    // Refresh Token Generate if Access Token expires
    async refresh(req, res, next) {
        try {
            // get token from cookies
            const { refreshToken: refreshTokenFromCookie } = req.cookies

            // verify token 
            const verifyToken = tokenServices.verifyRefreshToken(refreshTokenFromCookie)

            if (!verifyToken) {
                return res.status(401).json(CustomErrorHandler.unAuthorized())
            }

            // after verify token check is it in the db
            const tokenInDb = await tokenServices.findRefreshToken({ userId: verifyToken.id, token: refreshTokenFromCookie })

            if (!tokenInDb) {
                return res.status(401).json(CustomErrorHandler.unAuthorized("Invalid Token!"))
            }
            // if it is in db then find the user, available or not
            const user = await userServices.findUser({ _id: verifyToken.id })

            if (!user) {
                return res.status(401).json(CustomErrorHandler.notFound("User not found!"))
            }
            // create a token
            const { refreshToken, accessToken } = tokenServices.generateToken({ id: user._id, isAdmin: user.isAdmin })

            // update the token into database
            await tokenServices.updateRefreshToken({ userId: user._id, token: refreshToken })

            // set cookies
            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            })

            res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            })
            const userDto = new UserDto(user)
            return res.status(200).json({ ...userDto, auth: true })
        } catch (error) {
            next(error)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            await tokenServices.removeToken({ token: refreshToken })
            res.clearCookie("refreshToken");
            res.clearCookie("accessToken");
            return res.status(200).json({ user: null, auth: false })
        } catch (error) {
            next(error)
        }
    }
    // USER STATS
    async getUserStats(req, res, next) {
        try {
            if (req.isAdmin === true) {
                const user = await User.aggregate([
                    { $project: { mon: { $month: '$createdAt' } } },
                    { $group: { _id: "$mon", users: { $push: "$_id" }, total: { $sum: 1 } } }
                ])
                return res.status(200).json(user)
            } else {
                return res.status(401).json(CustomErrorHandler.unAuthorized())
            }
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new AuthController()