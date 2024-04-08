const fs = require("fs");
const Product = require("../models/products");
const Users = require("../models/users");
const Cart = require("../models/cart");

exports.getAllProducts = async (req, res) => {
  try {
    let readProducts = await Product.find();
    let user = { email: req.user.email };
    res.status(200).json({
      products: readProducts,
      email: user,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllProductsAdmin = async (req, res) => {
  try {
    let email = req.user.email;
    let user = await Users.findOne({ email });
    if (user.role == "admin") {
      let readProducts = await Product.find();
      let user = { email: req.user.email };
      res.status(200).json({
        products: readProducts,
        email: user,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.addProducts = async (req, res) => {
  try {
    let email = req.user.email;
    let user = await Users.findOne({ email });
    if (user.role == "admin") {
      const { Name, Description, Price, Category, StockQuantity, ImageUrl } =
        req.body;
      const newproducts = new Product({
        Name,
        Description,
        Price,
        Category,
        StockQuantity,
        ImageUrl,
      });
      newproducts.save();
      res.status(200).json({ message: "Product added sucessfully" });
    } else {
      res.status(200).json({ message: "Unauthorized to add product" });
    }
  } catch (error) {
    console.error("Error adding products:", error);
  }
};

exports.editProductsAdmin = async (req, res) => {
  try {
    let email = req.user.email;
    let id = req.params.id;
    let user = await Users.findOne({ email });
    if (user.role == "admin") {
      const { Name, Description, Price, Category, StockQuantity, ImageUrl } =
        req.body;
      await Product.findByIdAndUpdate(id, {
        Name,
        Description,
        Price,
        Category,
        StockQuantity,
        ImageUrl,
      });
      res.status(200).json({ message: "Product edited sucessfully" });
    } else {
      res.status(200).json({ message: "Unauthorized to add product" });
    }
  } catch (error) {
    console.error("Error adding products:", error);
  }
};

exports.deleteProducts = async (req, res) => {
  try {
    let email = req.user.email;
    let user = await Users.findOne({ email });
    if (user.role == "admin") {
      let id = req.params.id;
      deleteProduct = await Product.findById(id);
      let filepath = deleteProduct.ImageUrl.split("/");
      let filename = "../backendnode/assets/" + filepath[filepath.length - 1];
      await Product.findByIdAndDelete(id);
      await Cart.deleteMany({ productID: id });
      fs.unlink(filename, (err) => {
        if (err) {
          console.log(err);
        }
      });
      res.status(200).json({ message: "Deleted!!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `Error in delete: ${error}` });
  }
};

exports.getCategory = async (req, res) => {
  let category = req.params.category;
  try {
    let readProducts = await Product.find({ Category: category });
    let user = { email: req.user.email };
    res.status(200).json({
      products: readProducts,
      email: user,
    });
  } catch (error) {
    console.log(error);
  }
};
