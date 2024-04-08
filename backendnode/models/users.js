const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: false,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      unique: false,
    },
    phone: {
      type: Number,
      require: true,
      unique: true,
    },
    refreshToken: {
      type: String,
      unique: false,
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", userSchema);
module.exports = Users;