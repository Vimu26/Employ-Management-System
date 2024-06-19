const userDetailsModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (userDetails) => {
  return await userDetailsModel.create({
    name: userDetails.name,
    email: userDetails.email,
    password: userDetails.password,
    contact : userDetails.contact
  });
};

const login = async (userDetails, res) => {
  const user = await userDetailsModel.findOne({
    where: { email: userDetails.email }
  });
  if (!user) {
    return false;
  }

  const isValidPassword = await bcrypt.compare(
    userDetails.password,
    user.password
  );
  if (!isValidPassword) {
    return false;
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
  const user = await userDetailsModel.findByPk(id);

  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }

  if (userDetails.password) {
    const salt = await bcrypt.genSalt(10);
    userDetails.password = await bcrypt.hash(userDetails.password, salt);
  }

  Object.assign(user, userDetails);
  return await user.save();
};

const deleteUser = async (id) => {
  const user = await userDetailsModel.findByPk(id);

  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }

  return await user.destroy();
};

module.exports = {
  signup,
  login,
  getAllUsers,
  updateUser,
  deleteUser
};
