const express = require("express");
const router = express.Router();

const {
  updateUser,
  updateUserPassword,
  currentUser,
} = require("../controllers/userController");

const { authenticateUser } = require("../middleware/authentication");

router.route("/").get(authenticateUser, currentUser);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updatePassword").patch(authenticateUser, updateUserPassword);

module.exports = router;
