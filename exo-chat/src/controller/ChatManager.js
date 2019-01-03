import openSocket from 'socket.io-client';

class ChatManager {
    constructor() {
        this.socket = null;
        this.callbacks = [];
    }

    addCallback(callbackName, callback) {
        this.callbacks.push({name: callbackName, call: callback});
    }

    sendMessage(messageText) {
        if(messageText.length === 0) return;

        console.log("sent " + messageText);
        this.socket.emit('message_written', messageText);
        this.receiveMessage(
            {
                senderId: "Vous",
                text: messageText,
                date: (new Date()).toLocaleDateString(),
                className: "message-outcoming"
            }
        );
    }

    receiveMessage(message) {
        // console.log("received");
        // console.log(message);

        this.callbacks.forEach((c) => {
            if (c.name === 'message_received') {
                c.call(message);
            }
        });
    }

    otherUserDisconnected(username) {
        console.log("disconnected " + username);

        this.callbacks.forEach((c) => {
            if (c.name === 'user_disconnected') {
                c.call(username);
            }
        });
    }

    otherUserConnected(username) {
        console.log("connected " + username);

        this.receiveMessage(
            {
                senderId: "Général",
                text: username + " arrive pour animer les foules",
                date: (new Date()).toLocaleDateString(),
                className: "message-general"
            }
        );

        this.callbacks.forEach((c) => {
            if (c.name === 'user_connected') {
                c.call(username);
            }
        });
    }

    connect(username) {
        // TODO: error handling
        this.socket = openSocket('http://localhost:3001', {query: "username=" + username});
        this.socket.on('message_received', (message) => {
            this.receiveMessage(message);
        });
        this.socket.on('user_connected', (username) => {
            this.otherUserConnected(username);
        });
        this.socket.on('user_disconnected', (username) => {
            this.otherUserDisconnected(username);
        })
    }
}

export default ChatManager;
