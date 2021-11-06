const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const http = require("http");
const database = require("./config/database");
const server = http.createServer(app);
const mailer = require("./config/mailer");
const fs = require('fs');
app.use(express.json());
// fs.readFile('./test.html', (err, html) => {
//   var htmlString = html.toString();
//   mailer("chobisa.henit@gmail.com", "Sending html", htmlString);
// });
database();

app.use('/api/public', require("./routes/PublicManagement/public"));



server.listen("2000", () => console.log('Server running on port 2000'));
