const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

server.get('/',(req,res)=>{
  res.send("Hi")
})
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;