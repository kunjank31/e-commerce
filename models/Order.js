const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    orderId: { type: String, required: true },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    paymentStatus: { type: String, default: "" },
    status: { type: String, default: "pending" },
    paymentMode: { type: String, default: "cash" },
    paymentInfo: { type: Object, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
