const multer = require("multer");
const path = require("path");

let filename;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../backendnode/assets/"));
  },
  filename: function (req, file, cb) {
    filename =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

const uploadImage = (req, res, next) => {
  upload.single("imageupload");
  console.log("filename", filename);
  req.imagename = filename;
  next();
};

module.exports = uploadImage;
