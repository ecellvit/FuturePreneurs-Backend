const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const http = require("http");
const PORT = process.env.PORT || 2000;
const database = require("./config/database");
const server = http.createServer(app);
const mailer = require("./config/mailer");
var io = require('socket.io')(server, {cors: {
    origin: '*',
    methods: ["GET", "POST", "PUT"]
  }});

// fs.readFile('./test.html', (err, html) => {
//   var htmlString = html.toString();
//   mailer("palanikannan.m2020@vitstudent.ac.in", "FuturePreneurs", htmlString);
// });
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'fp.ecellvit.com');
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}
database(); 
app.use(cors(
  "*"
));
app.use(allowCrossDomain);
app.use(express.json());
app.use('/api/public', require("./routes/PublicManagement/public"));
app.use('/api/voice/token', require('./routes/token'));
app.use('/api/RoundOne', require('./routes/RoundOne/RoundOne'));
app.use('/api/management', require('./routes/Management/management'));
app.use('/api/roundTwo', require('./routes/RoundTwo/RoundTwo'));
app.use(require('./SocketArchitecture/Websockets')(io));
app.use('/add3', require('./addData'));
app.use('/add4', require('./add4'));

server.listen(PORT, () => console.log('Server running on port 2000'));
