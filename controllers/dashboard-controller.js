const { send } = require("express/lib/response");
const config = require("../db_config");
const sgMail = require("@sendgrid/mail");
const path = require("path"),
	fs = require("fs"),
	Captcha = require("captcha-generator-alphanumeric").default;
const { response } = require("express");
const connection = config.connection;

async function handleEmail (params) {
    const {filepath, fileURL} = params; 
    const originalPath = `./${filepath.replace(/\\/g, "/")}`;
    const fileName =  originalPath.split('/')[2];

   sgMail.setApiKey(process.env.SENDGRID_KEY);
     await fs.readFile((originalPath), async (err, data) => {
   const pathToAttachment = originalPath;
   const attachment = await fs.readFileSync(pathToAttachment);
   const attachmentContent = await attachment.toString("base64");
       if (err) {
         console.log("file error---", err)
       }
       if (data) {
         const msg = {
           to: 'rajsriselvan.ca@gmail.com',
           from: 'ramvijaya96@gmail.com',
           subject: 'User Verification CAPTCHA',
           html: `<p1>Please find the Captcha attached to this Email</p1>`,
           attachments: [
             {
               content: attachmentContent,
               filename: fileName,
               contentType: "image/jpeg",
               disposition: 'attachment',
             },
           ],
         };
        await sgMail.send(msg).then((response) => {
           console.log(":success--Email", )
       }).catch((error) => console.log("failed---", error))
       }
     });
   
}

async function handleCaptcha () {
   let captcha = new Captcha();
   const pathCaptcha = await fs.createWriteStream(path.join("public/", `${captcha.value}.jpeg`))
   const captchaFile = await captcha.JPEGStream.pipe(pathCaptcha);
   const CaptchaURL = process.env.BASEURL+captchaFile.path;
   const params = {
       filepath: captchaFile.path,
       fileURL: CaptchaURL,
   }
  handleEmail(params)
}

exports.createEmployee = (request, response) => {
    const data = request.body;
    const filePath = request.file ? request.file.path : "";
    connection.query(`INSERT INTO Employee ( First_Name, Last_Name, Email_ID,
        Current_Address, Permanent_Address, Graduation_Date, Years_Of_Experience, SkillSet, ImageURL) VALUES
    ("${data.firstName}", "${data.lastName}", "${data.emailID}", "${data.currentAddress}",
    "${data.permanentAddress}", "${data.graduationDate}", "${data.yearsOfExperience}",  "${data.skillSet}", "${filePath}")`,
        function (error, result) {
            if (error) response.send(error);
            else response.send("success");
        });
}

exports.getEmployeelist = (request, response) => {
    handleCaptcha();
    const pageNo = request.query.pageNumber;
    const countLimit = request.query.countToDisplay;
    const returnIndex = pageNo == 0 ? 0 : (pageNo-1) * countLimit;
    var sql1 = `select * from employee order by Employee_ID LIMIT ${countLimit} offset ${returnIndex}`;
    var sql2 = 'select count(*) as cnt from employee';
    connection.query(sql1, function (err, records) {
        if (err) throw err;
        connection.query(sql2, function (err, count) {
            if (err) throw err;
            const item = {
                data: records,
                totalCount: count[0].cnt
            }
            response.send(item);
        });
    });
}
exports.getAllEmployeelist = (request, response) => {
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