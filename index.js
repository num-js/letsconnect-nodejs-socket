const express = require('express');
const cors = require('cors')
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const { EVENT_JOIN, EVENT_MESSAGE, EVENT_MESSAGE_RECEIVED, EVENT_CHAT } = require('./src/utils/constants.ts');

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});


app.get('/', (req, res) => {
  res.send('<h1>Welcome to LetsConnect Chat-App</h1>');
});

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
  socket.on(EVENT_JOIN, (data) => {
    console.log('User joined:', data);
    io.emit(EVENT_CHAT, data);
  });
  socket.on(EVENT_MESSAGE, (data) => {
    console.log('Message received:', data);
    io.emit(EVENT_MESSAGE_RECEIVED, data);
  });
});

const port = process.env.PORT || 5000;
server.listen(5000, () => {
  console.log('server running at http://localhost:5000');
});