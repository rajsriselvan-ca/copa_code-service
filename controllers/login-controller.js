const config = require("../db_config");
const connection =  config.connection;
const jwt = require('jsonwebtoken');

const { Client } = require("pg");

const client = new Client(process.env.DATABASE_URL);

client.connect();

// client.query(`INSERT INTO  (language_id, language_name ) VALUES
// ('8','Other')`,
//  (error, result) => {
//     if (error) {
//       console.error('Error executing query', error);
//     } else {
//       console.log('Result:', result);
//     }}) 

client.query("select * from programming_language", (error, result) => {
  if (error) {
    console.error('Error executing query', error);
  } else {
    console.log('Result:', result.rows);
  }
  
});

exports.userRegister = (request, response) => {
    const user_name = request.body.username;
    const user_password = request.body.password;
    const submission_date = request.body.submission_date;

    client.query("select * from registered_users",
    (error, registeredUsers) => {
        if(error) response.send(error);
        else {
            const UserExist = registeredUsers.find(record => record.user_name.toLowerCase() === user_name.toLowerCase()) === undefined ? false : true;
            if(!UserExist) {
                client.query(`INSERT INTO registered_users (user_name, user_password, submission_date) VALUES
                ("${user_name}", "${user_password}", "${submission_date}")`,
                    (error, result) => {
                        if(error) response.send(error);
                        else response.send("success");
                    });
            } else {
                response.send("error");
            }
        }
    });
};

exports.loginUserDetailsPost = (request, response) => {
    const user_name = request.body.username;
    const user_password = request.body.password;
    client.query(`select user_id, user_name, submission_date from registered_users where user_name = "${user_name}" AND user_password = "${user_password}"`,
    (error, userList) => {
        if(error) response.send(error);
        else {
            const user = { name: user_name};
            if(userList.rows.length){
                const jwtToken = jwt.sign(user, process.env.JWT_ACCESS_KEY, { expiresIn: '10m'});
                response.json({token: jwtToken, userDetails: userList.rows[0]});
            } else {
                response.send("User Not Exist");    
            }
        }
    });
    client.end();
};
