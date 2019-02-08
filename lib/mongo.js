const { MongoClient,ObjectId } = require('mongodb')
const { config } = require('../config')
const debug = require('debug')('app:mongo')

const DB_USER = encodeURIComponent(config.db_user)
const DB_PASSWORD = encodeURIComponent(config.db_password)
const DB_HOST = config.db_host
const DB_PORT = config.db_port
const DB_NAME = config.db_name

const MONGO_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/?authSource=${DB_NAME}`

class mongo 
{
  constructor()
  {
    this.client = new MongoClient(MONGO_URI,{useNewUrlParser:true})
    this.dbName = DB_NAME
  }

  connect()
  {
    return new Promise( (res,rej) => 
    {
      this.client.connect( (err) => 
      {
        if(err)
        {
          rej(err)
        }
        
        debug('Conectado a mongo')
        res(this.client.db(this.dbName))
      } )
    })
  }

  getAll(collection)
  {
   return this.connect()
    .then( db => db.collection(collection).find({}).toArray())
  }

  getItem(collection,id)
  {
    return this.connect()
    .then( db => db.collection(collection).findOne({_id:ObjectId(id)}))
  }

  createItem(collection,body)
  {
    return this.connect()
    .then( db => db.collection(collection).insertOne(body))
  }

}

module.exports = mongo