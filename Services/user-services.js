const User = require("../models/User");

class UserServices {
  async findUser(data) {
    return await User.findOne(data);
  }
  async createUser(data) {
    return await User.create(data);
  }
  async updateUser(data) {
    return await User.updateOne(data);
  }
}

module.exports = new UserServices();
