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

// export async function createUser(req, res) {
//   try {
//     const { name, email, password } = req.body;
//     const newUser = await create({ name, email, password });
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// export async function getUser(req, res) {
//   try {
//     const { id } = req.params;
//     const user = await findByPk(id);
//     if (user) {
//       res.status(200).json(user);
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// export async function updateUser(req, res) {
//   try {
//     const { id } = req.params;
//     const { name, email, password } = req.body;
//     const [updated] = await update({ name, email, password }, { where: { id } });
//     if (updated) {
//       const updatedUser = await findByPk(id);
//       res.status(200).json(updatedUser);
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// export async function deleteUser(req, res) {
//   try {
//     const { id } = req.params;
//     const deleted = await destroy({ where: { id } });
//     if (deleted) {
//       res.status(204).send();
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

module.exports = { getAllUsers, updateUser ,DeleteUser };
