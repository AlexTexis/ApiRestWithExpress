const express = require('express')
const router = express.Router()
const passport = require('passport')
const boom = require('boom')
const jwt = require('jsonwebtoken')
const {config} = require('../../config')

require('../../utils/auth-strategies/basic')

router.post('/',async (req,res,next) => {
  passport.authenticate('basic',(err,user) => {
    try 
    {
      if(err || !user)
      {
        next(boom.unauthorized())
      }  

      req.login(user,{session:false},async (err)=> 
      {
        if(err)
        {
          next(err)

        }

        const payload = {sub: user.username}
        const token =jwt.sign(payload,config.auth_secret,{expiresIn:'15m'})

        res.status(200).json({token})
      })
    }
  catch(err)
  {
        next(err)
  }
})(req,res,next)
})

module.exports = router