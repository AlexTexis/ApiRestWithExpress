const Joi = require('joi')
const boom = require('boom')

const validate = (data,schema) => 
{
  const {error} = Joi.validate(data,schema)
  return error
}

const validationHandler = (schema,check="body") => 
{
  return (req,res,next) => 
  { 
    const err = validate(req[check],schema)
    err ? next(boom.badRequest(err)) : next()
  }
}

module.exports = validationHandler