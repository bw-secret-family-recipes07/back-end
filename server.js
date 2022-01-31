const express = require('express');
const server = express()
const cors = require('cors');
const helmet = require('helmet');
const authRouter = require('./api/auth/auth-router');

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/api/auth', authRouter);

// server.use((err, req, res, next) => {
//     res.status(err.status || 500).json({
//       message: err.message,
//       stack: err.stack,
//     });
//   });
  

module.exports = server;