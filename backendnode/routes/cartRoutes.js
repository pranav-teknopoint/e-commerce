const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authenticateToken = require("../middlewares/authenticateToken.js");

router.post("/addtocart", cartController.addCartItem);
router.delete("/deletefromcart/:id", cartController.deleteCartItem);
router.get("/viewcart/:email", cartController.viewCartItems);
router.get("/cartnumber/:email", cartController.getCartNumber);
router.get("/category/:category", cartController.getCartCategory);

module.exports = router;
