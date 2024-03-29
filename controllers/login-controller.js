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

    client.query("SELECT * FROM registered_users WHERE LOWER(user_name) = LOWER($1)", [user_name],
    (error, registeredUsers) => {
        if(error) {
            response.send(error);
        } else {
            const userExists = registeredUsers.rows.length > 0;
            if(!userExists) {
                const query = `INSERT INTO registered_users (user_name, user_password, submission_date) VALUES ($1, $2, $3)`;
                const values = [user_name, user_password, submission_date];
                client.query(query, values, (error, result) => {
                    if(error) {
                        response.send(error);
                    } else {
                        response.send("success");
                    }
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

    client.query(
        `SELECT user_id, user_name, submission_date FROM registered_users WHERE user_name = $1 AND user_password = $2`,
        [user_name, user_password],
        (error, userList) => {
            if (error) {
                response.send(error);
            } else {
                const user = { name: user_name };
                if (userList.rows.length) {
                    const jwtToken = jwt.sign(user, process.env.JWT_ACCESS_KEY, { expiresIn: '90m' });
                    response.json({ token: jwtToken, userDetails: userList.rows[0] });
                } else {
                    response.send("User Not Exist");
                }
            }
        }
    );
};
