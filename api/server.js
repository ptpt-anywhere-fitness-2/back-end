const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("./auth/authrouter");
const usersRouter = require("./users/usersrouter");
const restricted = require("./middleware/restricted");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", restricted, usersRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up and running" });
});

module.exports = server;

