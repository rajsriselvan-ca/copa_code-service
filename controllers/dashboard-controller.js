const config = require("../db_config");
const connection = config.connection;

exports.createEmployee = (request, response) => {
    const data = request.body;
    const incomingContent = JSON.stringify(data.content);
    connection.query(`INSERT INTO notes (note_type_id, user_id, program_id, note_title, content, submission_date ) VALUES
    ("${data.note_type_id}", "${data.user_id}", "${data.program_id}", "${data.note_title}", ${incomingContent}, "${data.submission_date}")`,
        function (error, result) {
            if (error) response.send(error);
            else response.send("success");
        })
}
exports.getEmployeelist = (request, response) => {
     const data = request.query;
     connection.query(`select * from notes where user_id = "${data.user_id}"`,
         (error, result) => {
             if (error) response.send(error);
             else response.send(result);
         })
 }
exports.deleteEmployee = (request, response) => {
    const id = request.params.id;
     connection.query(`delete from notes where note_id = "${id}"`,
         (error, result) => {
             if (error) response.send(error);
             else response.send("success");
         })
 }
 exports.updateEmployee = (request, response) => {
    const data = request.body;
    const incomingContent = JSON.stringify(data.content);
    const id = JSON.parse(request.params.id)
     connection.query(`update notes set note_title = "${data.note_title}", content = ${incomingContent}, user_id = "${data.user_id}",
     note_type_id = "${data.note_type_id}", program_id = "${data.program_id}" where note_id = ${id}`,
         (error, result) => {
             if (error) response.send(error);
             else response.send("success");
         })
 }