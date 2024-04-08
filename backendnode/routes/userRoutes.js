const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateToken = require("../middlewares/authenticateToken");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/viewuser/:email", authenticateToken, userController.viewUser);
router.put("/editpassword/:id", authenticateToken, userController.editPassword);

module.exports = router;
