const express = require('express');
const cors = require('cors');
const corsOptions = { 
    origin: "*", 
    credentials: true 
 };
const app = express();
app.use(cors(corsOptions));
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
var port = process.env.port || 3001;
var io = require('socket.io')(server,{ cors: { origin: '*' } });





//socket
io.on('connection', (socket)=>{
    socket.on('set-name', (name)=>{
        console.timeLog('name',name);
        socket.nickname = name;
        io.emit('users-changed', {user:name, event: 'joined'});
    });

    socket.on('conn', (value) => {
        console.log({name:value.name,event: value.event});
        io.emit('conn', {name:value.name,event: value.event});
    });

    socket.on('disconn', (value) => {
        console.log({name:value.name,event: value.event});
        io.emit('disconn', {name:value.name,event: value.event});
    });
    socket.on('message', (message)=>{
        io.emit('message', {msg: message.msg, created: new Date(), user: message.user, receiver_id: message.receiver_id, readStatus:message.readStatus});
    });
    socket.on('publicmessage', (message)=>{
        console.log(message)
        io.emit('publicmessage', {msg: message.msg, created: new Date(), user: message.user});
    });
});

//main server
server.listen(port, ()=>{
    console.log('listening in http://localhost:'+port)
})

