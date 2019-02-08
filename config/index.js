require('dotenv').config()

const config = {
  dev : process.env.NODE_ENV !== 'production',
  db_user : process.env.DB_USER,
  db_password : process.env.DB_PASSWORD,
  db_name : process.env.DB_NAME,
  db_port : process.env.DB_PORT,
  db_host : process.env.DB_HOST,
  auth_secret : process.env.AUTH_SECRET_KEY
}

module.exports = { config }