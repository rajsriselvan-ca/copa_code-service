const config = require("../db_config");
const connection =  config.connection;
const jwt = require('jsonwebtoken');

const { Client } = require("pg");

const client = new Client(process.env.DATABASE_URL);

client.connect();



exports.userRegister = (request, response) => {
    const user_name = request.body.username;
    const user_password = request.body.password;
    const submission_date = request.body.submission_date;

    client.query("select * from registered_users",
    (error, registeredUsers) => {
        if(error) response.send(error);
        else {
            const UserExist = registeredUsers.rows.find(record => record.user_name.toLowerCase() === user_name.toLowerCase()) === undefined ? false : true;
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
    console.log("heyy herere loginn---",user_name, user_password);
    client.query(`select user_id, user_name, submission_date from registered_users where user_name = '${user_name}' AND user_password = '${user_password}'`,
    (error, userList) => {
        if(error) response.send(error);
        else {
            const user = { name: user_name};
            console.log("22n---",userList.rows);
            if(userList.rows.length){
                const jwtToken = jwt.sign(user, process.env.JWT_ACCESS_KEY, { expiresIn: '10m'});
                response.json({token: jwtToken, userDetails: userList.rows[0]});
            } else {
                response.send("User Not Exist");    
            }
        }
    });
};
