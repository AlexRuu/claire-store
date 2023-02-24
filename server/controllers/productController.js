const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");

const getAllProducts = async (req, res) => {
  const products = await Product.find({});

  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getSingleProduct = async (req, res) => {};

const createProduct = async (req, res) => {};

const updateProduct = async (req, res) => {};

const deleteProduct = async (req, res) => {};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  getSingleProduct,
  deleteProduct,
};
