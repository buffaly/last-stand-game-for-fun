const express = require('express');
const path = require('path');

// socket.io
var server = require('http').Server(express);
var io = require('socket.io')(server);
const PORT = parseInt(process.env.PORT) || 3000;
const pathStatic = path.join(__dirname, '../public/');

main();

function main() {
  const app = express();
  app.use(express.static(pathStatic));
  server.listen(80);
  io.on('connection', function(socket) {
    socket.on('user_action', function(data) {
      socket.broadcast.emit('user_action', data);
    });
    socket.on('init_user', data => {
      socket.broadcast.emit('init_new_user', data);
    });

    socket.on('user_logout', function(data) {
      socket.broadcast.emit('user_logout', data);
    });
  });

  app.get('/', (req, res) => {
    res.sendFile(pathStatic + 'controller.html');
  });
  app.get('/game', (req, res) => {
    res.sendFile(pathStatic + 'temp_game.html');
  });

  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  });
}
