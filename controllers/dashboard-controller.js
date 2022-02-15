const config = require("../db_config");
const connection = config.connection;

exports.createEmployee = (request, response) => {
    const data = request.body;
    console.log("p--->>", data)
    // const incomingContent = JSON.stringify(data.content);
    connection.query(`INSERT INTO Employee ( First_Name, Last_Name, Email_ID,
        Current_Address, Permanent_Address, Graduation_Date, Years_Of_Experience, SkillSet) VALUES
    ("${data.firstName}", "${data.lastName}", "${data.emailID}", "${data.currentAddress}",
    "${data.permanentAddress}", "${data.graduationDate}", "${data.yearsOfExperience}",  "${data.skillSet}")`,
        function (error, result) {
            if (error) console.log("err----", error);
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