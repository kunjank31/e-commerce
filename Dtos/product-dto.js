class UserDto {
    id; name; brand; slug; productImg; productDetails; category; size; color; price; isStock; createdAt; updatedAt;
    constructor(product) {
        this.id = product._id
        this.name = product.name
        this.brand = product.brand
        this.slug = product.slug
        this.productImg = product.productImg
        this.productDetails = product.productDetails
        this.category = product.category
        this.price = product.price
        this.color = product.color
        this.size = product.size
        this.isStock = product.isStock
        this.createdAt = product.createdAt
        this.updatedAt = product.updatedAt
    }
}

module.exports = UserDto