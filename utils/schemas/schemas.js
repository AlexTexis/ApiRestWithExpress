const Joi = require('joi')

const idSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/).error(new Error('id no valida'))

const jobSchema = Joi.array().items(Joi.string().max(10))

const bodySchema = {
  name : Joi.string().required().error(new Error('nombre requerido')),
  jobs : jobSchema
}

module.exports = {
  idSchema,
  jobSchema,
  bodySchema
}