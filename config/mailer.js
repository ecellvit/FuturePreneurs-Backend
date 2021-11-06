const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const mailer = async function (target,subject,htmlString){

  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://developers.google.com/oauthplayground',
  );


  oauth2Client.setCredentials({
    refresh_token : process.env.REFRESH_TOKEN,
  });

  const accesstoken = oauth2Client.getAccessToken();
  const transports = nodemailer.createTransport({
    service : "gmail",
    auth : {
      type : "OAuth2",
      user : "chobisa.henit@gmail.com",
      clientId : process.env.CLIENT_ID,
      clientSecret : process.env.CLIENT_SECRET,
      refreshToken : process.env.REFRESH_TOKEN,
      accessToken : accesstoken,
    },
    tls : {
      rejectUnauthorized : false,
    }
  });

  const mailOptions = {
    to : target,
    from : "chobisa.henit@gmail.com",
    subject : subject,
    generateTextFromHTML: true,
    html : htmlString
  }
  transports.sendMail(mailOptions, (error, response) => {
    error ? console.log(error) : console.log(response);
    transports.close();
  });

}
module.exports = mailer;
