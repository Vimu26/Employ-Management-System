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

const login = async (userDetails, res) => {
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

const getAllUsers = async () => {
  return await userDetailsModel.findAll();
};

const updateUser = async (id, userDetails) => {
  console.log(userDetails, id);
  if (userDetails.password !== undefined) {
    const salt = await bcrypt.genSalt(10);
    userDetails.password = await bcrypt.hash(userDetails.password, salt);
  }
  const user = await userDetailsModel.findOne({
    where: { _id: id }
  });
  if (user) {
    await userDetailsModel.update(userDetails, { where: { _id: user._id } });
    const updatedUser = await userDetailsModel.findOne({
      where: { _id: user._id }
    });
    return updatedUser;
  }
};

module.exports = {
  signup,
  login,
  getAllUsers,
  updateUser
};
