const mySql = require('mysql');

exports.connection = mySql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Mysql@29',
    database: 'practice'
});