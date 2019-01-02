var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

let users = [];

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/get_users.json', function (req, res) {
    res.send(JSON.stringify(users));
});

io.on('connection', function (socket) {
    // =========== CONNECTION =============
    const newUsername = socket.request._query['username'];
    socket.associatedUsername = newUsername;
    console.log('New user connected: ' + newUsername);

    if (users.indexOf(newUsername) !== -1) {
        // TODO: reject connection
        console.log('Username already taken')
    }
    else {
        users.push(newUsername);
        socket.broadcast.emit('user_connected', newUsername);
    }

    // ========= NOUVEAU MESSAGE ===========
    socket.on('message_written', function (message) {

        // =========== WHISPER =============
        if (message.indexOf("@") === 0) {
            let first_word = message.split(" ")[0];
            let target_user = first_word.substring(1);
            let sockets = io.sockets.sockets;
            let found = false;

            Object.keys(sockets).forEach((s) => {
                let username_for_socket = sockets[s].associatedUsername;

                if (username_for_socket === target_user) {
                    found = true;
                    sockets[s].emit(
                        'message_received',
                        {
                            senderId: newUsername,
                            text: message,
                            date: (new Date()).toLocaleDateString()
                        }
                    );
                }
            });

            if (found) return;
        }

        // ========= PING ===========
        if (message === "/ping") {
            socket.emit(
                "message_received",
                {
                    senderId: "Général",
                    text: "Pong!",
                    date: (new Date()).toLocaleDateString()
                }
            );
            return;
        }

        // ======== NORMAL BROADCAST ==========
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

        socket.broadcast.emit(
            'user_disconnected',
            newUsername
        );
    });
});

http.listen(3001, function () {
    console.log('listening on *:3001');
});
