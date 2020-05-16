const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../auth/auth-model')
const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { username } = req.body
    const user = await db.findBy({username})

    if (user){
      return res.status(409).json({
        message: "Username already taken!"
      })
    }

    res.status(201).json(await db.add(req.body))
  }
  catch (err) {
    next(err)
  }
})

router.post('/login', async (req, res, next) => {
  const authErr = {
    message: "Invalid credentials."
  }

  try {
    const user = await db.findBy({ username: req.body.username })
    if (!user) {
      return res.status(401).json(authErr)
    }

    const passwordCheck = await bcrypt.compare(req.body.password, user.password)
    if (!passwordCheck) {
      return res.status(401).json(authErr)
    }

    const tokenPayload = {
      userId: user.id,
    }
    res.cookie('token', jwt.sign(tokenPayload, process.env.JWT_SECRET))
    res.json({
      message: `Welcome, ${user.username}`
    })
  }

  catch (err) {
    next(err)
  }
})

module.exports = router;
