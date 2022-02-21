const { send } = require("express/lib/response");
const config = require("../db_config");
const connection = config.connection;

exports.createEmployee = (request, response) => {
    const data = request.body;
    connection.query(`INSERT INTO Employee ( First_Name, Last_Name, Email_ID,
        Current_Address, Permanent_Address, Graduation_Date, Years_Of_Experience, SkillSet) VALUES
    ("${data.firstName}", "${data.lastName}", "${data.emailID}", "${data.currentAddress}",
    "${data.permanentAddress}", "${data.graduationDate}", "${data.yearsOfExperience}",  "${data.skillSet}")`,
        function (error, result) {
            if (error) response.send(error);
            else response.send("success");
        })
}
exports.getEmployeelist = (request, response) => {
    const pageNo = request.query.pageNumber;
    const countLimit = 5;
    const returnIndex = pageNo == 0 ? 0 : pageNo * countLimit;
    var sql1 = `select * from employee order by Employee_ID LIMIT ${countLimit} offset ${returnIndex}`;
    var sql2 = 'select count(*) as cnt from employee';
    connection.query(sql1, function(err, records){
        if (err) throw err; 
        connection.query(sql2, function(err, count) {
            if (err) throw err;
            const item = {
                data:records, 
                totalCount:count[0].cnt
            }
            response.send(item);
        });  
    });
 }
 exports.getAllEmployeelist =  (request, response) => {
     connection.query(`select * from employee`,
         (error, result) => {
             if (error) response.send(error);
             else response.send(result);
         });
 }
exports.deleteEmployee = (request, response) => {
    const id = request.params.id;
     connection.query(`delete from employee where Employee_ID = "${id}"`,
         (error, result) => {
             if (error) response.send(error);
             else response.send("success");
         })
 }
 exports.updateEmployee = (request, response) => {
    const data = request.body;
     connection.query(`update Employee set First_Name = "${data.First_Name}", Last_Name = "${data.Last_Name}", Email_ID = "${data.Email_ID}",
     Current_Address = "${data.Current_Address}", Permanent_Address = "${data.Permanent_Address}",
      Graduation_Date = "${data.Graduation_Date}", Years_Of_Experience="${data.Years_Of_Experience}", SkillSet = "${data.SkillSet}" where Employee_ID = ${data.Employee_ID}`,
         (error, result) => {
             if (error) response.send(error);
             else response.send("success");
         })
 }