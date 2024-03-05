const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");
const userService = require("../services/user.service");

dotenv.config();

const signup = async (req, res) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = await userService.signup({
      email: req.body.email,
      password: hashPassword,
      name: req.body.name
    });
    if (user) {
      return res.status(201).json({
        status: true,
        message: "User Registered Successfully",
        data: user
      });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ status: false, message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const token = await userService.login(req.body, res);
    if (token === false) {
      return res.status(401).json({
        status: false,
        message: "Invalid credentials"
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "User Login Successful",
        data: {
          token: token
        }
      });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = { login, signup };
