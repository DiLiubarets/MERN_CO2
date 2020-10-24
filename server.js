const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const ws = require('ws');

const users = require("./routes/api/users");
const sensor = require("./routes/api/sensor")

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const dbCred = require("./config/keys");

// Connect to MongoDB
mongoose
  .connect(
    dbCred.dbURL + dbCred.secretOrKey + dbCred.dbPath,
    {   dbName: 'note',
    useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/sensor", sensor);



const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', (socket, req) => {
  let key = req.url.substring(6, req.url.length)
  sensor.socketSetter(key, socket)
  console.log(key, "opened")
  socket.on('close', () => { console.log(key, "closed"); sensor.socketCleaner(key) })
  socket.on('message', (params) => { sensor.sendHistoricalData(key, JSON.parse(params)) })
});


const port = process.env.PORT || 5000;

// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
const server = app.listen(port, () => console.log(`Server up and running on port ${port} !`));
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});

