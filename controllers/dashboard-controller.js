const { send } = require("express/lib/response");
const config = require("../db_config");
const sgMail = require("@sendgrid/mail");
const path = require("path"),
	fs = require("fs"),
	Captcha = require("captcha-generator-alphanumeric").default;
const { response } = require("express");
const connection = config.connection;

   function base64_encode(file){
    let bitmap = fs.readFileSync(file); // issue when dynamic file path passed
    return  new Buffer(bitmap).toString('base64');
  }


 function handleEmail (params) {
     const {filepath, fileURL} = params; // dynamic values are coming here
     const originalPath = filepath.replace(/\\/g, "/");
    sgMail.setApiKey(process.env.SENDGRID_KEY);
    let data_base64 =  base64_encode(`./public/94FYZ6.png`) // issue is here, when i set originalPath. But if it is static it is working
    const message = {
        to: "ramvijaya96@gmail.com",
        from: {
            name : "SZIGONY Test Email",
            email : "ramvijaya96@gmail.com"
        },
        subject: "Test Email",
        html: `<img src="cid:94FYZ6" />`,
        attachments: [
            {
                filename: "94FYZ6.png", // these all need to pass dynamic
                contentType: "image/png",
                content: data_base64,
                cid: "94FYZ6"
            }
        ]
    }
    sgMail.send(message).then((response) => {
        console.log(":success--Email", )
    }).catch((error) => console.log("failed---", error))
}

function handleCaptcha () {
    let captcha = new Captcha();
    console.log(captcha.value);
    const captchaFile = captcha.PNGStream.pipe(fs.createWriteStream(path.join("public/", `${captcha.value}.png`)));
    const CaptchaURL = process.env.BASEURL+captchaFile.path;
    const params = {
        filepath: captchaFile.path,
        fileURL: CaptchaURL
    }
    handleEmail(params);
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