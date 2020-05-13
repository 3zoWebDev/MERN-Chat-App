const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
let PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = socketio(server);
const { addUser , removeUser , getUser , getUsersInRoom } = require("./Users")



mongoose
  .connect(
    process.env.MONGODB,
    {
    useUnifiedTopology: true,
    useNewUrlParser: true,
   }
  )
  .then((res) => console.log("mongodb is connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//The Routes for The API
app.use("/api/users/", require("./route/user.route"));


//admin
app.use("/adminbro", require("./admin"));
app.get("*", (req, res) =>
  res.json({ error: "Are you lost?", status: 404 }).status(404)
);

//SetUp the Socket Server
io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, name, room });

      if(error) return callback(error);

      socket.join(user.room);

      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

      callback();
    });

    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id);

      io.to(user.room).emit('message', { user: user.name, text: message });

      callback();
    });

    socket.on('disconnect', () => {
      const user = removeUser(socket.id);

      if(user) {
        io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
      }
    })
  });


server.listen(PORT , ()=> console.log(`Server Running on port ${PORT}`))
