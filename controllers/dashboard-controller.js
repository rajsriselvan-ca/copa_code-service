const config = require("../db_config");
const connection = config.connection;

exports.getNotesType = (request, response) => {
    connection.query("select * from notes_type",
        (error, result) => {
            if (error) response.send(error);
            else response.send(result);
        })
}
exports.getLanguage = (request, response) => {
    connection.query("select * from programming_language",
        (error, result) => {
            if (error) response.send(error);
            else response.send(result);
        })
}
exports.createNotes = (request, response) => {
    const data = request.body;
    const incomingContent = JSON.stringify(data.content);
    connection.query(`INSERT INTO notes (note_type_id, program_id, note_title, content, submission_date ) VALUES
    ("${data.note_type_id}", "${data.program_id}", "${data.note_title}", ${incomingContent}, "${data.submission_date}")`,
        function (error, result) {
            if (error) response.send(error);
            else response.send("success");
        })
}
exports.getNotes = (request, response) => {
   const id = JSON.parse(request.params.id)
    connection.query(`select * from notes where note_type_id = "${id}"`,
        (error, result) => {
            if (error) response.send(error);
            else response.send(result);
        })
}
exports.deleteNote = (request, response) => {
    const id = request.params.id;
     connection.query(`delete from notes where note_id = "${id}"`,
         (error, result) => {
             if (error) response.send(error);
             else response.send("success");
         })
 }
 exports.updateNotes = (request, response) => {
    const data = request.body;
    const incomingContent = JSON.stringify(data.content);
    const id = JSON.parse(request.params.id)
     connection.query(`update notes set note_title = "${data.note_title}", content = ${incomingContent},
     note_type_id = "${data.note_type_id}", program_id = "${data.program_id}" where note_id = ${id}`,
         (error, result) => {
             if (error) response.send(error);
             else response.send("success");
         })
 }