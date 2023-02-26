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
  const product = await Product.create(req.body);
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

const uploadImage = async (req, res) => {
  const images = req.files.image;
  const results = await Promise.all(
    images.map((image) => {
      return cloudinary.uploader.upload(image.tempFilePath, {
        use_filename: true,
        folder: "Clurr Store",
      });
    })
  );
  results.map((result) => {
    console.log(result.secure_url);
  });
  // const result = await cloudinary.uploader.upload(
  //   req.files.image.tempFilePath,
  //   {
  //     use_filename: true,
  //     folder: "Clurr Store",
  //   }
  // );
  // console.log(result);
  // fs.unlinkSync(req.files.image.tempFilePath);
  // return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  getSingleProduct,
  deleteProduct,
  uploadImage,
};
