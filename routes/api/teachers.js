const express = require('express')
const services = require('../../services/teachers')
const serviceTeachers = new services()
const debug = require('debug')('app:request')

const router = express.Router()

router.get('/',async (req,res,next) => 
{
  const { tags } = req.query
  try 
  {
    const teachers = await serviceTeachers.getTeachers({tags})
    
    res.status(200).json({
      payload:teachers,
      message:"maestros obtenidos"
    })
  }
  catch(err)
  {
    next(err)
  }
})

router.get('/:id',async (req,res,next) => 
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

router.post('/',async (req,res,next) => 
{
  const { body } = req
  try 
  {
    const newTechaer = await serviceTeachers.createTeacher({body})
    res.status(201).json({
      payload:newTechaer,
      message:"maestro nuevo"
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
  const {body} = req

  try 
  {

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

  }
  catch(err)
  {
    next(err)
  }
})


module.exports = router