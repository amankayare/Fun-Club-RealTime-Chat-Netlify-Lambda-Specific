const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, getRoomUsers, userLeave } = require('./utils/users');

require('dotenv').config();

const app = express();
require('./startup/prod')(app);
const server = http.createServer(app);

const io = socketio(server);
const botName = 'FunClub Bot'


//set static folder
app.use(express.static(path.join(__dirname, 'public')));
const Port = process.env.PORT || 3000;
server.listen(Port, () => console.log(`Server is runnig on port ${Port}`));


// Run this function whenever a user is connected
io.on('connection', socket => {

    console.log('new socket connection ');
    //If same character is already in room
    socket.on('checkExistUser', ({ username, room }) => {
        const users = getRoomUsers(room);
        const alreadyExist = users.find((user) => user.username === username);
        if (alreadyExist) {
            console.log('server:if already exist');
            socket.emit("my error", "This character is already taken by someone please choose another character or can use your name but we recommend you to choose character from the list for better experience!");

        }

    });

    //join room listener
    socket.on('joinRoom', ({ username, room }) => {

        //join sockets to particular room
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        //send welcome msg on joinning to that user
        socket.emit('message', formatMessage(botName, `Welcome to the FUN CLUB ${user.room}`));

        //broadcast a msg that new user is joinned except the joined user
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined a room`));

        //Send online user info and room info || also send this info when user disconnects
        io.to(user.room).emit('roomUsers', {

            room: user.room,
            users: getRoomUsers(user.room)

        });
    });


    //Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        console.log('message is listened at server')
        const user = getCurrentUser(socket.id);
        //sending the recieved msg from one user to all other users
        io.to(user.room).emit('message', formatMessage(user.username, msg));

    });

    //when user is disconnected or leave the room
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if (user) {
            //send disconnected message to all
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the room`));

        }
        //   sending room and online user info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)

        });

    });

});