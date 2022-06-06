const stripe = require("stripe")(process.env.STRIPE_PAYMENT_API);

const stripePaymentObj = async (amount, stripeToken, id, next) => {
  try {
    await stripe.charges.create({
      amount: amount,
      source: stripeToken,
      currency: "inr",
      desc: `Product id : ${id}`,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = stripePaymentObj;
