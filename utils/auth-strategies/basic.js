const passport = require('passport')
const {BasicStrategy} = require('passport-http')
const boom = require('boom')
const bcrypt = require('bcrypt')
const mongoLib = require('../../lib/mongo')

passport.use(
  new BasicStrategy(async (username,password,cb) => 
  {
    try 
    {
      const mongo = new mongoLib()
        const user = await mongo.getAll('users',{username})

        if(!user)
        {
          return cb(boom.unauthorized(),false)
        }

        if(!(await bcrypt.compare(password,user.password)))
        {
           return cb(boom.unauthorized(),false)
        }

       return cb(null,user)
    }
    catch(err)
    {
      return cb(err)
    }
  })
)