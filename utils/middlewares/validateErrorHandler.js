const boom = require('boom')
const {config} = require('../../config')
const isRequestAjaxOrApi = require('./isRequestAjaxOrApi')

const whithStack = (err,stack) => 
{
  if(config.dev)
  {
    return {...err,stack}
  }
}

const logErrors = (err,req,res,next) => 
{
  console.log(err.stack)
  next(err)
}

const wrapError = (err,req,res,next) => 
{
  if(!err.isBoom)
  {
    next(boom.badImplementation(err))
  }
 
    next(err)
 
}

const clientErrorHandler = (err,req,res,next) => 
{
  
  if(isRequestAjaxOrApi(req) || res.headersSent)
  {
  const { 
    output : { statusCode,payload }
  } = err

    res.status(statusCode).json(whithStack(payload,err.stack))
  }
  else 
  {
    next(err)
  }

}

const errorHandler = (err,req,res,next) => 
{
  const { output : {
    statusCode,
    payload
  }} = err

  res.status(statusCode).json(whithStack(payload,err.stack))
}

module.exports = {
  logErrors,
  wrapError,
  clientErrorHandler,
  errorHandler
}