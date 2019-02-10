const express = require('express')
const services = require('../../services/teachers')
const passport = require('passport')
const validation = require('../../utils/middlewares/validateDataHandler')
const cacheResponse = require('../../utils/cacheResponse')
const timeCache = require('../../utils/timeCacheResponse')
const serviceTeachers = new services()
const { idSchema,createSchema,updateSchema} = require('../../utils/schemas/schemas')
const router = express.Router()

require('../../utils/auth-strategies/jwt')

router.get('/',passport.authenticate('jwt',{session:false}),async (req,res,next) => 
{
  cacheResponse(res,timeCache)
  try 
  {
    const teachers = await serviceTeachers.getTeachers()
    res.status(200).json({
      payload : teachers,
      message : 'maestros obtenidos'
    })
  }
  catch(err)
  {
    next(err)
  }
})

router.get('/:id',passport.authenticate('jwt',{session:false}),validation({id : idSchema},'params'),async (req,res,next) => 
{
  cacheResponse(res,timeCache)
  const { id } = req.params
  try 
  { 
    const teacher = await serviceTeachers.getOnlyTeacher({id})
    res.status(200).json({
      payload : teacher,
      message : 'maestro obtenido'
    })
  }
  catch(err)
  {
    next(err)
  }
})

router.post('/',passport.authenticate('jwt',{session:false}),validation(createSchema),async (req,res,next) => 
{
  cacheResponse(res,timeCache)
  const { body } = req
  try 
  {
    const newTechaer = await serviceTeachers.createTeacher({body})
    res.status(201).json({
      payload : newTechaer,
      message : 'maestro nuevo'
    })
  }
  catch(err)
  {
    next(err)
  }
})

router.put('/:id',passport.authenticate('jwt',{session:false}),validation({id : idSchema},'params'),validation(updateSchema),async (req,res,next) => 
{
  cacheResponse(res,timeCache)
  const { id } = req.params
  const { body } = req

  try 
  {
    const updateTeacher = await serviceTeachers.updateTeacher({id,body}) 
    res.status(200).json({
      payload:updateTeacher,
      message:'teacher actualizado'
    })
  }
  catch(err)
  {
    next(err)
  }
})

router.delete('/:id',passport.authenticate('jwt',{session:false}),validation({id : idSchema},'params'),async (req,res,next) => 
{
  cacheResponse(res,timeCache)
  const { id } = req.params
  try 
  {
    const deleteTeacher = await serviceTeachers.deleteTeacher({id})
    res.status(200).json({
      payload : deleteTeacher,
      message : 'maestro eliminado'
    })
  }
  catch(err)
  {
    next(err)
  }
})


module.exports = router