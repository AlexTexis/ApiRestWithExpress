const Joi = require('joi')

const idSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/).error(new Error('id no valida'))

const jobSchema = Joi.array().items(Joi.string().max(20))

const bodySchema = {
  name : Joi.string(),
  role : jobSchema
}

module.exports = {
  idSchema,
  bodySchema
}