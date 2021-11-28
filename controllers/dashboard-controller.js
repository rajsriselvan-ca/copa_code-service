const config = require("../db_config");
const connection = config.connection;

exports.getNotesType = (request, response) => {
    connection.query("select * from notes_type",
        (error, result) => {
            if (error) response.send("error");
            else response.send(result);
        })
}
exports.getLanguage = (request, response) => {
    connection.query("select * from programming_language",
        (error, result) => {
            if (error) response.send("error");
            else response.send(result);
        })
}
exports.createNotes = (request, response) => {
    const data = request.body;
    var post = {
        note_type_id: data.note_type_id,
        program_id: data.program_id,
        note_title: data.note_title,
        content: data.content,
        submission_date: data.submission_date
    };
    connection.query(`INSERT INTO notes (note_type_id, program_id, note_title, content, submission_date ) VALUES
    ("${data.note_type_id}", "${data.program_id}", "${data.note_title}", "${data.content}", "${data.submission_date}")`,
        function (error, result) {
            if (error) response.send(error);
            else response.send(result);
        })
}