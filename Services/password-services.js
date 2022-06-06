const bcryptjs = require("bcryptjs")

class PasswordServices {
    async hashPass(password) {
        return await bcryptjs.hash(password, 10)
    }
    async verifyPass(givenPassword, hashPassword) {
        return await bcryptjs.compare(givenPassword, hashPassword)
    }
}

module.exports = new PasswordServices()