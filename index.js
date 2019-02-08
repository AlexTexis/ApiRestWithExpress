const express = require('express')
const debug = require('debug')('app:server')
const bodyParser = require('body-parser')
const apiTeachers = require('./routes/api/teachers')
const apiAuth = require('./routes/api/auth')
const {logErrors,wrapError,clientErrorHandler,errorHandler} = require('./utils/middlewares/validateErrorHandler')
const isRequestAjaxOrApi = require('./utils/middlewares/isRequestAjaxOrApi')
const boom = require('boom')

//app instance
const app = express()

//middlewares
app.use(bodyParser.json())


//routes (API)
app.use('/api/teachers',apiTeachers)
app.use('/api/auth',apiAuth)

app.use((req,res,next) => {
  
  if(isRequestAjaxOrApi(req))
  {
    const {output : {statusCode,payload}} = boom.notFound()
    res.status(statusCode).json(payload)
  }

  res.status(404)
})

app.use(logErrors)
app.use(wrapError)
app.use(clientErrorHandler)
app.use(errorHandler)

//server init
const server = app.listen(3000,()=> debug(`server listen http://localhost:${server.address().port}`))