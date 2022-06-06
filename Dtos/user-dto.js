class UserDto {
    id; name; email; password; phone; image; address; createdAt; updatedAt;
    constructor(user) {
        this.id = user._id
        this.name = user.name
        this.email = user.email
        this.phone = user.phone
        this.image = user.image
        this.address = user.address
        this.createdAt = user.createdAt
        this.updatedAt = user.updatedAt
    }
}

module.exports = UserDto