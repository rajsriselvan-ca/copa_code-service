const config = require("../db_config");
const connection =  config.connection;

exports.userRegister = (request, response) => {
    const user_name = request.body.username;
    const user_password = request.body.password;
    const submission_date = request.body.submission_date;

    connection.query(`INSERT INTO registered_users (user_name, user_password, submission_date) VALUES
    ("${user_name}", "${user_password}", "${submission_date}")`,
        (error, result) => {
            if(error) response.send("error");
            else response.send("success");
        });
};

exports.page = (request, response) => {
    response.send("Heyy Raju")
};