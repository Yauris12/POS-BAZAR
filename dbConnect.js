const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI)

let connection = mongoose.connection

connection.on('connected', () => {
  console.log(' MONGO DB SUCCESFULL')
})

connection.on('error', () => {
  console.log(' CONNECTION FAILED')
})
