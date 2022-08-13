const express = require('express')
const itemModel = require('../models/itemModel')

const router = express.Router()

router.get('/allproducts', async (req, res) => {
  try {
    const items = await itemModel.find()
    res.send(items)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post('/addProduct', async (req, res) => {
  try {
    const newItem = new itemModel(req.body)
    await newItem.save()
    res.send('item added succesifly')
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post('/editProduct', async (req, res) => {
  try {
    await itemModel.findOneAndUpdate({ _id: req.body.itemId }, req.body)
    res.send('item updated succesifly')
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post('/deleteProduct', async (req, res) => {
  try {
    await itemModel.findOneAndDelete({ _id: req.body.itemId })
    res.send('item delete succesifly')
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router
