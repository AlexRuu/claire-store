const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const register = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError(
      "The email is already taken. Please enter a different one."
    );
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role,
  });
};

const login = async (req, res) => {
  res.send("yeehaw");
};

const logout = async (req, res) => {
  res.send("lesgo");
};

module.exports = {
  register,
  login,
  logout,
};
