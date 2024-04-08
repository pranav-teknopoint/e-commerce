const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    Name: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    Category: {
      type: String,
      required: true,
    },
    cartQuantity: {
      type: Number,
      required: true,
    },
    ImageUrl: {
      type: String,
    },
    productID: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
