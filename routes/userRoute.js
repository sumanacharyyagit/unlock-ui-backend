const express = require("express");
const {
  signUser,
  getSpecificUser,
  logOut,
  createUpdateWeightInformation,
  getWeightInformation,
} = require("../controllers/user.js");

const { isLoggedIn } = require("../middlewares/user");

const router = express.Router();

router.route("/user/create").post(signUser);
router.route("/user/get").get(isLoggedIn, getSpecificUser);
router.route("/user/logout").get(isLoggedIn, logOut);
router
  .route("/information/create")
  .post(isLoggedIn, createUpdateWeightInformation);
router.route("/information/get").get(isLoggedIn, getWeightInformation);

module.exports = router;
