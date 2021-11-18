const config = require("../db_config");
const connection =  config.connection;

exports.getNotesType = (request, response) => {
    connection.query("select * from notes_type", 
    (error, result) => {
        if(error) response.send("error");
        else response.send(result);
    })
}