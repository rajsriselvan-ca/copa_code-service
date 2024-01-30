const config = require("../db_config");
const connection = config.connection;

const { Client } = require("pg");

const client = new Client(process.env.DATABASE_URL);

client.connect();

// const client = new Client(process.env.DATABASE_URL);

// client.query(`INSERT INTO notes (note_type_id, user_id, program_id, note_title, content, submission_date ) VALUES
// ('23', '1', '33', 'Test Record', 'This is a test data.', '04-01-2022 01:49 AM')`,
//  (error, result) => {
//     if (error) {
//       console.error('Error executing query', error);
//     } else {
//       console.log('Result:', result.rows);
//     }})

exports.getNotesType = (request, response) => {
    client.query("select * from notes_type",
        (error, result) => {
            if (error) response.send(error);
            else response.send(result.rows);
        })
}
exports.getLanguage = (request, response) => {
    client.query("select * from programming_language",
        (error, result) => {
            if (error) response.send(error);
            else response.send(result.rows);
        })
}
exports.createNotes = (request, response) => {
    const data = request.body;
    const incomingContent = data.content;
    client.query(`INSERT INTO notes (note_type_id, user_id, program_id, note_title, content, submission_date ) VALUES
    ('${data.note_type_id}', '${data.user_id}', '${data.program_id}', '${data.note_title}', '${incomingContent}', '${data.submission_date}')`,
        function (error, result) {
            if (error) response.send(error);
            else response.send("success");
        })
}
exports.getNotes = (request, response) => {
    const data = request.query;
    client.query(`select * from notes where user_id = '${data.user_id}' and note_type_id = '${data.selectedTab}'`,
        (error, result) => {
            if (error) response.send(error);
            else response.send(result.rows);
        })
}
exports.getAllNotes = (request, response) => {
     const data = request.query;
     client.query(`select * from notes where user_id = '${data.user_id}'`,
         (error, result) => {
             if (error) response.send(error);
             else response.send(result.rows);
         })
 }
exports.deleteNote = (request, response) => {
    const id = request.params.id;
    client.query(`delete from notes where note_id = '${id}'`,
         (error, result) => {
             if (error) response.send(error);
             else response.send("success");
         })
 }
 exports.updateNotes = (request, response) => {
    const data = request.body;
    const incomingContent = data.content;
    const id = JSON.parse(request.params.id)
    client.query(`update notes set note_title = '${data.note_title}', content = '${incomingContent}', user_id = '${data.user_id}',
     note_type_id = '${data.note_type_id}', program_id = '${data.program_id}' where note_id = '${id}'`,
         (error, result) => {
             if (error) response.send(error);
             else response.send("success");
         })
 }