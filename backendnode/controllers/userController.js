const Users = require("../models/users");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Generate access token secret
const ACCESS_TOKEN_SECRET = crypto.randomBytes(64).toString("hex");

// Generate refresh token secret
const REFRESH_TOKEN_SECRET = crypto.randomBytes(64).toString("hex");

exports.registerUser = async (req, res) => {
  const { username, email, password, phone } = req.body;

  // Check if email already exists
  const existingUser = await Users.findOne({ email: email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  } else {
    // Create a new user
    const newUser = new Users({ username, email, password, phone });
    await newUser.save();
    res
      .status(200)
      .json({ message: "User registered successfully", user: newUser });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  let readUser = await Users.findOne({ email: email });
  const userValid = readUser.password === password;

  if (!userValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate access token
  const accessToken = jwt.sign({ email: email }, ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });

  // Generate refresh token
  let readUserID = readUser._id;
  const refreshToken = jwt.sign({ email: email }, REFRESH_TOKEN_SECRET);
  await Users.findByIdAndUpdate(readUserID, { refreshToken });
  res.json({
    message: "Login successful",
    accessToken,
    refreshToken,
    readUserID,
  });
};

exports.viewUser = async (req, res) => {
  let email = req.params.email;
  try {
    let readUser = await Users.findOne({ email: email });
    res.status(200).json(readUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `Error in read: ${error}` });
  }
};

exports.editPassword = async (req, res) => {
  let id = req.params.id;
  let newpassword = req.body;
  try {
    // let readUser = await Users.findById(id);
    await Users.findByIdAndUpdate(id, { newpassword });
    res.status(200).json({ message: "Password Changed!!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `Error in read: ${error}` });
  }
};

exports.ACCESS_TOKEN_SECRET = ACCESS_TOKEN_SECRET;
