var nodemailer = require('nodemailer');
 
var reportLink = process.argv[2];
var resultStatus =  process.argv[3];
var productName = process.argv[4];
var folderName = process.argv[5];
var mailingList = process.argv[6];
 
//var report = "https://lqxqaartifacts.blob.core.windows.net/qa-automation/"+ reportLink

console.log('Entering parameter reportLink',reportLink);
console.log('Entering parameter resultStatus',resultStatus);
console.log('Entering parameter productName',productName);
console.log('Entering parameter folderName',folderName);

const searchRegExp = /--folder/gi;
const replaceWith = '';
//const folders = folderName.replace(searchRegExp, replaceWith); 
//console.log('Entering parameter folders',folders);

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "lqx.notif.automated@gmail.com",
    pass: "Liquidx!23"
  }
});

var mailOptions = {
  from: 'lqx.notif.automated@gmail.com',
  to: mailingList,
  subject: 'Execution Report - '+ productName + ' - '+ folderName + ' - ' + process.env.testcase,
  text: "Environment: "+ process.env.env + "\r\n\r\n" +   "Specified Module: "+ folderName + "\r\n\r\n" + reportLink  
  //Inblock_API_TestResults/" +env +"/"+ process.env.module + "_" + timeStamp

};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});