const userDetailsModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (userDetails) => {
  return await userDetailsModel.create({
    name: userDetails.name,
    email: userDetails.email,
    password: userDetails.password
  });
};

const login = async (userDetails , res) => {
  const user = await userDetailsModel.findOne({
    where: { email: userDetails.email }
  });
  if (!user) {
    return res.status(401).json({
      status: false,
      message: "Invalid credentials"
    });
  }

  const isValidPassword = bcrypt.compare(userDetails.password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({
      status: false,
      message: "Invalid credentials"
    });
  }

  const accessToken = jwt.sign(
    {
      sub: user._id, //subject Claim
      iss: user.name, // Issuer claim
      iat: Math.floor(Date.now() / 1000), // Issued At claim
      email: user.email
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
  return accessToken;
};

module.exports = {
  signup,
  login
};
