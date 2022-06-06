const Stripe = require("stripe")(process.env.STRIPE_PAYMENT_API)
const { v4: uuidv4 } = require("uuid")

class PaymentController {
    async payment(req, res, next) {
        const { amount, token } = req.body
        try {
            const customer = await Stripe.customers.create({
                email: token.email,
                source: token.id,
            })

            const payment = await Stripe.charges.create({
                currency: 'inr',
                amount: amount * 100,
                customer: customer.id,
                receipt_email: token.email,
            }, {
                idempotencyKey: uuidv4()
            });
            res.status(200).json(payment)
        } catch (error) {
            next(error)
        }
    }

    post_payment(req, res, next) {
        return res.json({ body: req.body })
    }
}


module.exports = new PaymentController()