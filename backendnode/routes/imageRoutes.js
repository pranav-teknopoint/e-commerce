const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController.js");
const multer = require("multer");
const path = require("path");

let filename;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../assets/"));
  },
  filename: function (req, file, cb) {
    filename =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

function imagename(req, res, next) {
  req.imagename = filename;
  next();
}
router.get("/viewimage/:id", imageController.viewImage);
router.post(
  "/uploadimage",
  upload.single("productimage"),
  imagename,
  imageController.saveImage
);
router.post(
  "/editimage/:id/:oldimagename",
  upload.single("updateproductimage"),
  imagename,
  imageController.editImage
);

module.exports = router;
