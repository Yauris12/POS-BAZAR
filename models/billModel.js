const mongoose = require('mongoose')

const billSchema = mongoose.Schema(
  {
    customerName: { type: String, required: true },
    customPhoneNumber: { type: String, required: true },
    paymentMode: { type: String, required: true },
    total: { type: Number, required: true },
    tax: { type: Number, required: true },
    subTotal: { type: Number, required: true },
    cartItems: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
)

const billModel = mongoose.model('bill', billSchema)

module.exports = billModel
