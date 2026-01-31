const path = require('path');
const env = process.env.NODE_ENV || 'development';
const envFile = env === 'production' ? '.env' : '.env.local';

require('dotenv').config({ path: path.resolve(__dirname, envFile) });

// console.log(process.env.DB_PORT);


const database = require('knex')({
    client: 'pg',
    connection: {
      host : process.env.DB_HOST,
      port : process.env.DB_PORT,
      user : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      ssl: false,
    }
  });
  
  

module.exports = database;
