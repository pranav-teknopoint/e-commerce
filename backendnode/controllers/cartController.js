const User = require("../models/users");
const jwt = require("jsonwebtoken");
const Cart = require("../models/cart");
const Product = require("../models/products");

Array.prototype.sum = function () {
  let sum = 0;
  for (let i = 0; i < this.length; i++) {
    sum = sum + +this[i];
  }
  return sum;
};

exports.addCartItem = async (req, res) => {
  const { id, user } = req.body;
  const productID = id;
  try {
    const { Name, Description, Price, Category, ImageUrl } =
      await Product.findById(id);
    const cartItem = await Cart.findOne({ Name: Name, email: user });
    if (cartItem) {
      let Quantity = cartItem.cartQuantity + 1;
      console.log(Quantity);
      let cartItemID = cartItem._id;
      await Cart.findByIdAndUpdate(cartItemID, { cartQuantity: Quantity });
      res.status(200).json({ message: "Increment" });
    } else {
      let cartQuantity = 1;
      const newItem = new Cart({
        email: user,
        Name,
        Description,
        Price,
        Category,
        cartQuantity,
        ImageUrl,
        productID,
      });
      newItem.save();
      console.log("Saved");
      res.status(200).json({ message: "Added to Cart" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.deleteCartItem = async (req, res) => {
  let id = req.params.id;
  try {
    let deleteItem = await Cart.findById(id);
    if (deleteItem.cartQuantity == 1) {
      await Cart.findByIdAndDelete(id);
      res.status(200).json({ message: "Deleted!!" });
    } else {
      newQuantity = deleteItem.cartQuantity - 1;
      await Cart.findByIdAndUpdate(id, { cartQuantity: newQuantity });
      res.status(200).json({ message: "Deleted!!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `Error in delete: ${error}` });
  }
};

exports.viewCartItems = async (req, res) => {
  let email = req.params.email;
  try {
    let readCart = await Cart.find({ email: email });
    readCart.forEach((data) => {
      updateCart(data, email);
    });
    let updatedCart = await Cart.find({ email: email });
    res.status(200).send(updatedCart);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `Error in read: ${error}` });
  }
};

exports.getCartCategory = async (req, res) => {
  let category = req.params.category;
  let email = req.user.email;
  try {
    let readProducts = await Cart.find({ email, Category: category });
    let user = { email: req.user.email };
    res.status(200).json({
      products: readProducts,
      email: user,
    });
  } catch (error) {
    console.log(error);
  }
};

async function updateCart(cartData, email) {
  const { Name, Description, Price, Category, ImageUrl } =
    await Product.findById(cartData.productID);
  updatedItem = await Cart.findOneAndUpdate(
    { email: email },
    { Name, Description, Price, Category, ImageUrl }
  );
}

exports.getCartNumber = async (req, res) => {
  let email = req.params.email;
  try {
    let readCart = await Cart.find({ email: email });
    TotalQuantity = [];
    readCart.forEach((data) => {
      TotalQuantity.push(data.cartQuantity);
    });
    res.status(200).json({ TotalQty: TotalQuantity.sum() });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `Error in read: ${error}` });
  }
};
