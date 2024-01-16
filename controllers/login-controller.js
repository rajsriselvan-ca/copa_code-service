const config = require("../db_config");
const connection =  config.connection;
const jwt = require('jsonwebtoken');

exports.userRegister = (request, response) => {
    const user_name = request.body.username;
    const user_password = request.body.password;
    const submission_date = request.body.submission_date;


    connection.query("select * from registered_users",
    (error, registeredUsers) => {
        if(error) response.send(error);
        else {
            const UserExist = registeredUsers.find(record => record.user_name.toLowerCase() === user_name.toLowerCase()) === undefined ? false : true;
            if(!UserExist) {
                connection.query(`INSERT INTO registered_users (user_name, user_password, submission_date) VALUES
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
    connection.query(`select * from registered_users where user_name = "${user_name}" AND user_password = "${user_password}"`,
    (error, userList) => {
        if(error) response.send(error);
        else {
            const user = { name: user_name};
            if(userList.length){
                const jwtToken = jwt.sign(user, process.env.JWT_ACCESS_TOKEN);
                response.json({token: jwtToken, userDetails: userList[0]});
            } else {
                response.send("User Not Exist");    
            }
        }
    });
};
