const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require("../utils");

const currentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "update user" });
};

const updateUserPassword = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "update user password" });
};

module.exports = {
  currentUser,
  updateUser,
  updateUserPassword,
};
