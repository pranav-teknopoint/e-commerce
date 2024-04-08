const fs = require("fs");
const Product = require("../models/products");
const rootDir = "../backendnode/assets";

exports.viewImage = (req, res) => {
  imageName = req.params.id;
  try {
    res.sendFile(imageName, { root: rootDir });
  } catch (error) {
    console.log(error);
  }
};

exports.saveImage = (req, res) => {
  try {
    imagename = req.imagename;
    res.status(200).send(imagename);
  } catch (error) {
    console.log(error);
  }
};

exports.editImage = async (req, res) => {
  try {
    let oldimagename = req.params.oldimagename;
    let id = req.params.id;
    let filename = rootDir + "/" + oldimagename;
    fs.unlink(filename, (err) => {
      if (err) {
        console.log(err);
      }
    });
    const imagename = req.imagename;
    const ImageUrl = `http://localhost:3000/api/images/viewimage/${imagename}`;
    await Product.findByIdAndUpdate(id, { ImageUrl });
    res.status(200).send(imagename);
  } catch (error) {
    console.log(error);
  }
};
