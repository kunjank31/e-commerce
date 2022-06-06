const Product = require("../models/Product")

class ProductServices {
    async findProduct(data) {
        return await Product.findOne(data)
    }
    async createProduct(data) {
        return await Product.create(data)
    }
}
module.exports = new ProductServices()