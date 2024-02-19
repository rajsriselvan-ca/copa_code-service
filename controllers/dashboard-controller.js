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
    const query = `INSERT INTO notes (note_type_id, user_id, program_id, note_title, content, submission_date ) VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [data.note_type_id, data.user_id, data.program_id, data.note_title, incomingContent, data.submission_date];
    client.query(query, values, function (error, result) {
        if (error) {
            response.send(error);
        } else {
            response.send("success");
        }
    });
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
    const query = `update notes set note_title = $1, content = $2, user_id = $3, note_type_id = $4, program_id = $5 where note_id = $6`;
    const values = [data.note_title, incomingContent, data.user_id, data.note_type_id, data.program_id, id]
    client.query(query, values, function (error, result) {
        if (error) {
            response.send(error);
        } else {
            response.send("success");
        }
    });
 }