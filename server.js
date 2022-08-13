const express = require('express')
require('dotenv').config()
const app = express()

app.use(express.json())
const dbConnect = require('./dbConnect')

const itemRouter = require('./routes/itemsRoutes')
const userRoute = require('./routes/userRoute')
const billRoute = require('./routes/billsRoute')

const path = require('path')

if (process.env.NODE_ENV == 'production') {
  app.use('/', express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, `client/build/index.html`))
  })
}

const port = process.env.PORT || 5000

app.use('/api/products/', itemRouter)
app.use('/api/users/', userRoute)
app.use('/api/bills/', billRoute)

app.listen(port, () => console.log('SERVER RUNNING'))
