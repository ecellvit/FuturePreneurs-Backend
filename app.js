const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const http = require("http");
const PORT = const port = process.env.PORT || 2000;
const database = require("./config/database");
const server = http.createServer(app);
const mailer = require("./config/mailer");
const fs = require('fs');
var io = require('socket.io')(server);

// fs.readFile('./test.html', (err, html) => {
//   var htmlString = html.toString();
//   mailer("palanikannan.m2020@vitstudent.ac.in", "FuturePreneurs", htmlString);
// });

database();
app.use(cors());
app.use(express.json());
app.use('/api/public', require("./routes/PublicManagement/public"));
app.use(require('./SocketArchitecture/Websockets')(io));

server.listen(PORT, () => console.log('Server running on port 2000'));
