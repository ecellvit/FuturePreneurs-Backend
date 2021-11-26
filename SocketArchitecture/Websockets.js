const express = require("express");
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./User-InterActivity');


module.exports = function(io){
  const router = express.Router();
  console.log("Socket Online");
  io.on('connection', async function(socket){
    console.log("connection successfull");
    socket.on('joinRoom', (data) => {
      const username = data['name'];
            const email = data['email'];
            const photoURL = data['photoURL'];
            const room = data['teamID'];
            const type = data['type'];
            const user = userJoin(socket.id, username, email, photoURL, room, type);
            socket.join(user.room);
            // Send users and room info
            io.to(user.room).emit('roomUsers', {
              room: user.room,
              users: getRoomUsers(user.room)
            });

            socket.on('handraise', (data) => {
              socket.to(user.room).emit('handup', {"room" : user.room});
            });

            socket.on('handdown', (data) => {
              socket.to(user.room).emit('handclose', {"room" : user.room});
            })

            socket.on('disconnect', () => {
                const user = userLeave(socket.id);
                if (user) {
                  // Send users and room info
                  io.to(user.room).emit('roomUsers', {
                    room: user.room,
                    users: getRoomUsers(user.room)
                  });
                }
              });

              socket.on('update', (data) => {
                socket.broadcast.to(user.room).emit('change', data);
              });

              socket.on('message', (data) => {
                io.to(user.room).broadcast.emit('recieveMessage', data);
              })

    });
  });
  return router;
}
