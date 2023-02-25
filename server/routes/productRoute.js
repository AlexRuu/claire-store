const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  updateProduct,
  getSingleProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/productController");

const {
  authorizePermissions,
  authenticateUser,
} = require("../middleware/authentication");

router
  .route("/")
  .post(authorizePermissions("admin"), createProduct)
  .get(getAllProducts);

router
  .route("/uploadImage")
  .post([authenticateUser, authorizePermissions("admin")], uploadImage);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch([authenticateUser, authorizePermissions("admin")], updateProduct)
  .delete([authenticateUser, authorizePermissions("admin")], deleteProduct);

module.exports = router;
