const express = require("express");
const path = require("path");

// socket.io
var server = require("http").Server(express);
var io = require("socket.io")(server);
const PORT = parseInt(process.env.PORT) || 3000;
const pathStatic = path.join(__dirname, "../public/");

const Users = [];
/*
{
  username: string,
  user_id: timestamp,
  score: string
}
*/

main();

function main() {
  const app = express();
  app.use(express.static(pathStatic))
  server.listen(80);
  io.on("connection", function(socket) {
    socket.on("user_action", function(data) {
      socket.broadcast.emit("user_action", data);
    });
    socket.on("init_user", data => {
      const isDup = Users.find(user => user.user_id == data.user_id);
      if (!isDup) {
        data.score = 0;
        Users.push(data);
        console.log("user coming ", data);
      } else
        socket.broadcast.emit("recive_init_user", data);
    });
  });

  app.get("/", (req, res) => {
    res.sendFile(pathStatic + "controller.html");
  });
  app.get("/game", (req, res) => {
    res.sendFile(pathStatic + "game.html");
  });

  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  });
}
