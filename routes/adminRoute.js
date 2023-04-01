const express = require("express");
const { adminGetAllUsers, adminGetUserById } = require("../controllers/admin");
// const { adminAllUsers } = require("../controllers/userController");
const { isLoggedIn, customRole } = require("../middlewares/user");

const router = express.Router();

// Admin Routes Only
router
  .route("/admin/user/get/all")
  .get(isLoggedIn, customRole("admin"), adminGetAllUsers);

router
  .route("/admin/user/get/:id")
  .get(isLoggedIn, customRole("admin"), adminGetUserById);

module.exports = router;
