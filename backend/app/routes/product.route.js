const express = require("express");
const product = require("../controllers/product.controller");
// const publisher = require("../controllers/publisher.controller");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const originalname = file.originalname;
    const filename = originalname.replace(/\s+/g, "-");

    cb(null, filename);
    console.log(filename);
  },
});
const upload = multer({ storage });
const router = express.Router();

// router.route("/category")
//     .get(book.findAllCategory)
//     .post(book.createCategory)
//     .delete(book.deleteCategory);

// router.route("/category/:id")
//     .get(book.findOneCategory)
//     .put(book.updateCategory)
//     .delete(book.deleteCategory);

router
  .route("/")
  .get(product.findAll)
  .post(upload.single("hinhanh"), product.create)
  // .post(book.create)
  .delete(product.deleteAll);

router
  .route("/:id")
  .get(product.findOne)
  .put(upload.single("hinhanh"), product.update)
  .delete(product.delete);

// Route mới để cập nhật số lượng sách khi trả lại
router.route("/updateQuantity/:id").put(product.updateQuantity);
module.exports = router;
