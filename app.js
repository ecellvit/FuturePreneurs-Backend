const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const http = require("http");
const database = require("./config/database");
const server = http.createServer(app);
const mailer = require("./config/mailer");
database();



server.listen("2000", () => console.log('Server running on port 2000'));
