const express = require('express')
const debug = require('debug')('app:server')
const bodyParser = require('body-parser')
const apiTeachers = require('./routes/api/teachers')

//app instance
const app = express()

//middlewares
app.use(bodyParser.json())

//routes (API)
app.use('/api/teachers',apiTeachers)


//server init
const server = app.listen(3000,()=> debug(`server listen http://localhost:${server.address().port}`))