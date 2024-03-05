const express = require("express");
const router = express.Router();

const usersController = require("../controllers/user.controller");

router.get(
  "/", usersController.getAllUsers
);

router.patch(
  "/:id",usersController.updateUser,
);

module.exports = router;
