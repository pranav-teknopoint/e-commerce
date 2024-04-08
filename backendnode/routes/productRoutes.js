const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authenticateToken = require("../middlewares/authenticateToken");

router.post("/products", authenticateToken, productController.getAllProducts);
router.post("/addproducts", authenticateToken, productController.addProducts);
router.delete(
  "/deleteproducts/:id",
  authenticateToken,
  productController.deleteProducts
);
router.post(
  "/category/:category",
  authenticateToken,
  productController.getCategory
);
router.post(
  "/productsadmin",
  authenticateToken,
  productController.getAllProductsAdmin
);

router.post(
  "/edit/:id",
  authenticateToken,
  productController.editProductsAdmin
);

module.exports = router;
