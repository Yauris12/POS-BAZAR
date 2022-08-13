const express = require('express')
const UserModel = require('../models/userModel')

const router = express.Router()

router.post('/login', async (req, res) => {
  console.log('entra')
  try {
    console.log('entra1')

    const user = await UserModel.findOne({
      userId: req.body.userId,
      password: req.body.password,
      verified: true,
    })
    user.password = null
    if (user) {
      res.json(user)
    } else {
      res.status(400).json({ message: 'login failed' })
    }
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post('/register', async (req, res) => {
  try {
    const newUser = new UserModel({ ...req.body, verified: false })

    await newUser.save()
    res.send('User Register successfully')
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router
