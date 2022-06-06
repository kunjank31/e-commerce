const Order = require("../models/Order");
const CustomErrorHandler = require("../ErrorHandler/CustomErrorHandler");
const productServices = require("../Services/product-services");

class OrderController {
    // CREATE ORDER
    async orderCreate(req, res, next) {
        const { orderId,
            products,
            address,
            paymentMode,
            paymentInfo,
            paymentStatus,
            amount,
            status, } = req.body;
        try {
            const orderCreate = new Order({
                userId: req.id,
                orderId,
                products,
                address,
                paymentMode,
                paymentInfo,
                paymentStatus,
                amount,
                status,
            });
            await orderCreate.save();
            return res.status(201).json({ message: "Order has been placed!!" });
        } catch (error) {
            next(error);
        }
    }
    // GET ORDERS
    async getOrders(req, res, next) {
        const { userId } = req.query
        try {
            const order = userId ? await Order.find({ userId }).populate("userId products.productId")
                .exec() : req.isAdmin === true
                ? await Order.find().populate("userId products.productId").exec()
                : await Order.find({ userId: req.id })
                    .populate("userId products.productId")
                    .exec();
            return res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    }
    // PRODUCT STATS
    async getStats(req, res, next) {
        const { productId, totalSale } = req.query;
        try {
            if (req.isAdmin === true) {
                const product = await productServices.findProduct({ _id: productId });
                if (!product)
                    return res
                        .status(400)
                        .json(CustomErrorHandler.notFound("Product not Found"));
                const stats = totalSale
                    ? await Order.aggregate([
                        {
                            $project: {
                                products: 1,
                                _id: 0,
                                mon: { $month: "$createdAt" },
                                status: 1,
                            },
                        },
                        { $unwind: "$products" },
                        {
                            $match: {
                                "products.productId": product._id,
                                status: "delivered",
                            },
                        },
                        {
                            $group: {
                                _id: product._id,
                                total: { $sum: "$products.quantity" },
                            },
                        },
                    ])
                    : await Order.aggregate([
                        {
                            $project: {
                                products: 1,
                                _id: 0,
                                mon: { $month: "$createdAt" },
                                status: 1,
                            },
                        },
                        { $unwind: "$products" },
                        {
                            $match: {
                                "products.productId": product._id,
                                status: "delivered",
                            },
                        },
                        {
                            $group: { _id: "$mon", total: { $sum: "$products.quantity" } },
                        },
                    ]);
                return res.status(200).json(stats);
            } else {
                return res.status(400).json(CustomErrorHandler.unAuthorized());
            }
        } catch (error) {
            next(error);
        }
    }
    // INCOME
    async getIncome(req, res, next) {
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(
            new Date().setMonth(lastMonth.getMonth() - 1)
        );
        try {
            if (req.isAdmin === true) {
                const order = await Order.aggregate([
                    { $match: { createdAt: { $gte: previousMonth }, }, },
                    { $project: { month: { $month: "$createdAt" }, sales: "$amount" }, },
                    { $group: { _id: "$month", total: { $sum: "$sales" } } }
                ]);
                return res.status(200).json(order);
            } else {
                return res.status(400).json(CustomErrorHandler.unAuthorized());
            }
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new OrderController();
