const passport = require('passport')
const {Strategy,ExtractJwt} = require('passport-jwt')
const mongoLib = require('../../lib/mongo')
const boom = require('boom')
const {config} = require('../../config')

passport.use(
  new Strategy(
    {
      secretOrKey : config.auth_secret,
      jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (tokenPayload,cb) => {
   
    const mongo = new mongoLib()
    const user = await mongo.getAll('users',{username : tokenPayload.sub})

    if(!user)
    {
     return  cb(boom.unauthorized(),false)
    }

    return cb(null,user)

  })
  
)