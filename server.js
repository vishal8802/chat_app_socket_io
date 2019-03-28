const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const {
  db,
  Users
} = require('./db')

const app = express();
const server = http.Server(app);
const io = socketio(server);

let user = {};
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.use("/", express.static(__dirname + "/public"));

io.on("connection", socket => {
  console.log("Connected With " + socket.id);

  socket.on("login", data => {
    user[socket.id] = data.username;
    socket.emit("loggedin");
  });


  socket.on("chat", data => {
    socket.broadcast.emit("chat_rec", {
      username: user[socket.id],
      msg: data.msg
    });
  });
});


db.sync().then(() => {
  server.listen(5555, () => {
    console.log(`server started on http://localhost:5555`)
  })
})