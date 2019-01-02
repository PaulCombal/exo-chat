var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

let users = [];

app.get('/get_users.json', function (req, res) {

});

io.on('connection', function (socket) {
    // =========== CONNECTION =============
    const newUsername = socket.request._query['username'];
    console.log('New user connected: ' + newUsername);

    if (users.indexOf(newUsername) !== -1) {
        // TODO: reject connection
        console.log('Username already taken')
    }
    else {
        users.push(newUsername);
        socket.broadcast.emit('new_user', newUsername);
    }

    // ========= NOUVEAU MESSAGE ===========
    socket.on('message_written', function (message) {
        console.log(newUsername + ": " + message);
        socket.broadcast.emit(
            'message_received',
            {
                senderId: newUsername,
                text: message,
                date: (new Date()).toLocaleDateString()
            }
        );
    });


    // =========== DECONNECTION =============
    socket.on('disconnect', function () {
        console.log('User disconnected: ' + newUsername);
        let index = users.indexOf(newUsername);
        if (index > -1) {
            users.splice(index, 1);
        }
    });
});

http.listen(3001, function () {
    console.log('listening on *:3001');
});
