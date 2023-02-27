const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const cloudinary = require("cloudinary").v2;
const CustomError = require("../errors");
const fs = require("fs");

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(
      "There doesn't seem to be a product here..."
    );
  }
  res.status(StatusCodes.OK).json({ product });
};

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  let images = req.files.image;
  let results;
  let imageLinks = [];
  if (images.length > 1) {
    results = await Promise.all(
      images.map((image) => {
        return cloudinary.uploader.upload(image.tempFilePath, {
          use_filename: true,
          folder: "Clurr Store",
        });
      })
    );
  } else {
    results = await cloudinary.uploader.upload(images.tempFilePath, {
      use_filename: true,
      folder: "Clurr Store",
    });
  }
  if (results.length > 1) {
    results.map((result) => {
      imageLinks.push(result.secure_url);
    });
    return imageLinks;
  } else {
    imageLinks.push(results.secure_url);
  }

  const newProduct = { image: imageLinks, ...req.body };

  const product = await Product.create(newProduct);
  fs.unlinkSync(req.files.image.tempFilePath);
  res.status(StatusCodes.CREATED).json({ product });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new CustomError.NotFoundError("This product is not available...");
  }

  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError("This product is not available...");
  }

  await product.remove();

  res.status(StatusCodes.OK).json({ msg: "Product has been removed!" });
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  getSingleProduct,
  deleteProduct,
};
