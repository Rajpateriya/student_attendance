// db.js
const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port:'5432',
    database:'study',
    user:'postgres',
    password:'1122'
})

pool.connect((err) =>{
    if(err){
        console.error(`Connection error `, err.stack)
    }else{
        console.log('Connected')
    }
})

module.exports = pool;
