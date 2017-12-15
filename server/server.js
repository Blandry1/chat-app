const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);  //step0 for opening socket 
var io = socketIO(server);

app.use(express.static(publicPath));  //step1

io.on('connection', (socket) => { //step3
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port , () => {  //step2
  console.log(`Server is up on port ${port}`);
});
