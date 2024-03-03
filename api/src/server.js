const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Sequelize } = require('sequelize');
const authRouter =require("./routes/auth.routes")
const usersRouter = require('./routes/users.routes')

const app = express();
app.use(express.json());
app.use(cors());


dotenv.config();

app.use("/auth", authRouter);
app.use("/users", usersRouter);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  }
);

sequelize.authenticate().then(() => {
  console.log("MySql database Connected Successfully.");
}).catch((error) => {
  console.error("Unable to connect to the database:", error);
});

const PORT = process.env.PORT || 3172;

app.listen(PORT, (error) => {
  if (!error) {
    return console.log(`Api Started Successfully in Port ${PORT}!`);
  }
  return console.error(error.message);
});