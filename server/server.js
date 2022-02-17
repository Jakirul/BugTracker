const express = require('express')
const cors = require('cors')

const app = express()
const trackerRoutes = require('./routes/routes.js')

app.use('/', trackerRoutes)

app.use(cors())

module.exports = app;