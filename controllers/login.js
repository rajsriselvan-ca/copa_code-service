const config = require("../db_config");
const connection =  config.connection;

exports.userRegister = (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    connection.query(`INSERT INTO registered_users (username, user_password) VALUES
    ("${username}", "${password}")`,
        (err, result) => {
            console.log("err-->>", err);
        });
    response.send("Heyy there!!")
};

exports.page = (request, response) => {
    response.send("Heyy Raju")
};