const Joi = require('joi')

const idSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/).error(new Error('id no valida'))

const jobSchema = Joi.array().items(Joi.string().max(20))

const createSchema = {
  name : Joi.string().max(20).required().error(new Error('nombre requerido')),
  role : jobSchema
}

const updateSchema = {
  name : Joi.string().max(20),
  role : jobSchema
}

module.exports = {
  idSchema,
  createSchema,
  updateSchema
}