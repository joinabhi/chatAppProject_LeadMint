const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const formatMessage = require('./util/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./util/users');
const userRoute = require('./route/user');
const sequelize = require('./util/database');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const botName = 'ChatCord Bot';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRoute);
app.use(express.static(path.join(__dirname, 'public')));

// Dynamic route handler with error handling
app.use((req, res, next) => {
    const filePath = path.join(__dirname, 'public', req.url);
    res.sendFile(filePath, err => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
});

// Socket.io connection
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
        console.log("User joined: ", socket.id, username, room);
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        // Welcome current user
        socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

        // Broadcast when a user connects
        socket.broadcast
            .to(user.room)
            .emit('message', formatMessage(botName, `${user.username} has joined the chat`));

        // Send user and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    // Listen for chat messages
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    // Run when a client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if (user) {
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));

            // Send user and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
});

// Sync database and start server
sequelize.sync().then(() => {
    server.listen(4600, () => {
        console.log(`Server running on port 4600`);
    });
}).catch(error => console.log(error));
