const express = require("express");

const user = require("../controllers/user.controller");
const staff = require("../controllers/staff.controller");
const product = require("../controllers/product.controller");
const AuthToken = require("../middleware/AuthToken");

const router = express.Router();

router
  .route("/user")
  .get(AuthToken.verifyTokenAdmin, user.findAll)
  .post(AuthToken.verifyTokenAdmin, user.create)
  .put(AuthToken.verifyTokenAdmin, user.update)
  .delete(AuthToken.verifyTokenAdmin, user.deleteAll);
// SIGN UP/ LOGIN
router.route("/register").post(staff.create);
router.route("/login").post(staff.login);

// REFRESH TOKEN
router.route("/refresh").post(AuthToken.verifyTokenAdmin, staff.refreshToken);

// LOGOUT
router.route("/logout").post(AuthToken.verifyTokenAdmin, staff.logout);

// Order
router
  .route("/order")
  .post(AuthToken.verifyTokenAdmin, staff.addOrder)
  .put(AuthToken.verifyTokenAdmin, staff.updateOrder)
  .get(AuthToken.verifyTokenAdmin, staff.findAllOrder);

router
  .route("/manufacturer")
  .get(AuthToken.verifyTokenAdmin, staff.findAllManufacturer)
  .post(AuthToken.verifyTokenAdmin, staff.addManufacturer)
  .put(AuthToken.verifyTokenAdmin, staff.updateManufacturer);
// .delete(AuthToken.verifyTokenAdmin, staff.deleteManufacturer)

router
  .route("/manufacturer/:id")
  .delete(AuthToken.verifyTokenAdmin, staff.deleteManufacturer);

// .delete(AuthToken.verifyTokenAdminAdmin, user.delete);
module.exports = router;
