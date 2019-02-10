const express = require('express')
const services = require('../../services/teachers')
const serviceTeachers = new services()
const passport = require('passport')
const { idSchema,bodySchema} = require('../../utils/schemas/schemas')
const validation = require('../../utils/middlewares/validateDataHandler')
const router = express.Router()

require('../../utils/auth-strategies/jwt')

router.get('/',passport.authenticate('jwt',{session:false}),async (req,res,next) => 
{

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

router.get('/:id',validation({id : idSchema},'params'),async (req,res,next) => 
{
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

router.post('/',validation(bodySchema),async (req,res,next) => 
{
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

router.put('/:id',async (req,res,next) => 
{
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

router.delete('/:id',async (req,res,next) => 
{
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