const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const authRouter = require('./auth/authrouter')
const usersRouter = require('./users/usersrouter')
const classesRouter = require('./classes/classrouter')
const {restricted} = require("./auth/authmiddleware")

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.get('/', (req, res)=>{
  res.send('<h2>Server is running call endpoints</h2>')
})
server.use('/api/auth', authRouter);


server.use(restricted)
server.use('/api/classes', classesRouter);
server.use('/api/users', usersRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: 'api is running!' });
});

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server

