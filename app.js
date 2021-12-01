const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const http = require("http");
const fastcsv = require('fast-csv');
const URL = require('url');
const PORT = process.env.PORT || 2000;
const database = require("./config/database");
const server = http.createServer(app);
const mailer = require("./config/mailer");
const Event = require('./models/Event');
const Json2csvParser = require("json2csv").Parser;
const ObjectID = require('mongoose').Types.ObjectId;
const ObjectsToCsv = require('objects-to-csv');
const team = require("./models/TeamModel");
var io = require('socket.io')(server, {cors: {
    origin: '*',
    methods: ["GET", "POST", "PUT"]
  }});

  const fs = require("fs");
const Team = require("./models/TeamModel");
  const ws = fs.createWriteStream("teams.csv");

  var id = "61a6662eed5a1cee819c3639";

// fs.readFile('./test.html', (err, html) => {
//   var htmlString = html.toString();
//   mailer("palanikannan.m2020@vitstudent.ac.in", "FuturePreneurs", htmlString);
// });
// var allowCrossDomain = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'https://fp.ecellvit.com');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// }

database(); 
app.use(cors());
app.use(express.json());
app.use('/api/public', require("./routes/PublicManagement/public"));

app.use('/api/voice/token', require('./routes/token'));
app.use('/api/RoundOne', require('./routes/RoundOne/RoundOne'));
app.use('/api/management', require('./routes/Management/management'));
app.use('/api/roundTwo', require('./routes/RoundTwo/RoundTwo'));
app.use(require('./SocketArchitecture/Websockets')(io));
app.use('/add', require('./addData'));
// app.use('/add4', require('./add4'));

app.get('/teamData', async (req, res) => {
  const teams = await team.find({}).select(['TeamName', 'RoundTwoResponse'])
  // const teams = await team.find({}).populate('Leader Members RoundOneAttemptedQuestions')
  // console.log(teams);
  const json2csvParser = new Json2csvParser({ header: true });
  const csvData = json2csvParser.parse(teams);
  fs.writeFile('teams.csv', csvData ,function(error) {
    if (error) throw error;
    console.log("Write to bezkoder_mongodb_fs.csv successfully!");
  });
  res.json(teams);
});

app.post('/set', async (req, res) => {
  const event = await Event.findById(id);
  const { time } = req.body;
  const timeOfEvent = new Date(time);
  event.timeOfEvent = timeOfEvent;
  await event.save();
  res.json(event);
});


app.get('/', async (req, res) => {
  const query = URL.parse(req.url, true).query;
  const teamID = query.teamID;
  if (!ObjectID.isValid(teamID)){
    res.sendStatus(400);
  }
  else {
    const team = await Team.findById(teamID);
    const event = await Event.findById(id);
    res.json({event : event, hasCompletedRoundOne : team.RoundOneAttempted});
  }
  
});


server.listen(PORT, () => console.log('Server running on port 2000'));
