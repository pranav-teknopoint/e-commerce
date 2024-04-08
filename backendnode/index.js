// server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const authenticateToken = require("./middlewares/authenticateToken");
const cartRoutes = require("./routes/cartRoutes");
const imageRoutes = require("./routes/imageRoutes");

connectDB();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/cart", authenticateToken, cartRoutes); // Protected routes
app.use("/api/products", productRoutes);
app.use("/api/admin", productRoutes);
app.use("/api/images", imageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
