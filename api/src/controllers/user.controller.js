// import { create, findByPk, update, destroy } from './user';
const userService = require("../services/user.service");

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json({
      status: true,
      message: "All Users Fetched Successful",
      data: users
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ status: false, message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json({
      status: true,
      message: "User Updated Successfully",
      data: user
    });
  } catch (error) {
    if (!error.code == 11000) {
      console.error("An error occurred", error.message);
      return res.status(500).json({ status: false, message: error.message });
    }
    res.status(409).json({
      status: false,
      message: "An error occurred ",
      error: error.message
    });
  }
};

const DeleteUser = async (req, res) => {
  try {
    const users = await userService.deleteUser(req.params.id);
    return res.status(200).json({
      status: true,
      message: "User Deleted Successful",
      data: users
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = { getAllUsers, updateUser, DeleteUser };
