const express = require('express')
const BillModel = require('../models/billModel')

const router = express.Router()

router.post('/chargeBill', async (req, res) => {
  console.log('entro')

  try {
    console.log('entro1')
    const newBill = new BillModel(req.body)
    console.log('sigo')
    console.log(newBill)
    await newBill.save()
    console.log(newBill)

    console.log('AQUI ES')
    res.send('Bill Charget successfully')
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get('/', async (req, res) => {
  try {
    const bills = await BillModel.find()
    res.send(bills)
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router
