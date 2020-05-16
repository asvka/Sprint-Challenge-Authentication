const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser')


const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(cookieParser())

server.use('/api/auth', authRouter);
server.use('/api/jokes', jokesRouter);

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "You shall not pass!"
    })
})

module.exports = server;
