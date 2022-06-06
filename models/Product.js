const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      unique: true,
      required: true
    },
    category: {
      type: String,
      required: true,
    },
    productDetails: {
      type: String,
      required: true,
    },
    productImg: {
      type: Array,
      // required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isStock: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

const Product = new mongoose.model('Product', productSchema)

module.exports = Product