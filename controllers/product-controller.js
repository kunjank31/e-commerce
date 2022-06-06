const productServices = require("../Services/product-services")
const CustomErrorHandler = require("../ErrorHandler/CustomErrorHandler")
const ProductDtos = require('../Dtos/product-dto')
const Product = require("../models/Product")

class ProductController {
    // PRODUCT CREATED
    async productCreate(req, res, next) {
        const { name, brand, slug, category, color, size, productDetails, productImg, price, isStock } = req.body
        try {
            if (req.isAdmin === true) {
                const productExists = await productServices.findProduct({ slug })
                if (productExists) {
                    return res.status(400).json(CustomErrorHandler.alreadyExists("This slug's product has been acquired!"))
                }
                const product = await productServices.createProduct({ name, brand, slug, category, color, size, productDetails, productImg, price, isStock })
                const productDtos = new ProductDtos(product)
                return res.status(201).json(productDtos)
            } else {
                return res.status(400).json(CustomErrorHandler.unAuthorized())
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    // PRODUCT UPDATED
    async productUpdate(req, res, next) {
        try {
            if (req.isAdmin === true) {
                const product = await productServices.findProduct({ _id: req.params.id })
                if (!product) {
                    return res.status(404).json(CustomErrorHandler.notFound("Product not found!!!"))
                }
                const updatedProduct = await Product.findByIdAndUpdate({ _id: product.id }, { $set: req.body }, { new: true })
                const productDtos = new ProductDtos(updatedProduct)
                return res.status(200).json(productDtos)
            } else {
                return res.status(400).json(CustomErrorHandler.unAuthorized())
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    // PRODUCT DELETED
    async productRemove(req, res, next) {
        try {
            if (req.isAdmin === true) {
                const product = await productServices.findProduct({ _id: req.params.id })
                if (!product) {
                    return res.status(404).json(CustomErrorHandler.notFound("Product not found!!!"))
                }
                await Product.findByIdAndDelete({ _id: product.id })
                return res.status(200).json({ message: "Product is successfully removed!!" })
            } else {
                return res.status(400).json(CustomErrorHandler.unAuthorized())
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    // GET PRODUCTS
    async getProducts(req, res, next) {
        const { category, name } = req.query
        try {
            const product = name ? await Product.find({ name }) : category ? await Product.aggregate([
                { $set: { category: { $split: ['$category', ' '] } } },
                { $match: { category: { $all: [category] } } }
            ]) : await Product.find().sort({ _id: -1 })
            const productDtos = product.map(p => new ProductDtos(p))
            return res.status(200).json(productDtos)
        } catch (error) {
            next(error)
        }
    }
    // GET PRODUCT
    async getProduct(req, res, next) {
        try {
            const product = await productServices.findProduct({ slug: req.params.slug })
            const productDtos = new ProductDtos(product)
            return res.status(200).json(productDtos)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new ProductController()