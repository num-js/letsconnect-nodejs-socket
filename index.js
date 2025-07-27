const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.send('<h1>Welcome to LetsConnect Chat-App</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

const port = process.env.PORT || 5000;
server.listen(5000, () => {
  console.log('server running at http://localhost:5000');
});