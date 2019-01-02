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
        console.log("sent " + messageText);
        this.socket.emit('message_written', messageText);
        this.receiveMessage(
            {
                senderId: "Vous",
                text: messageText,
                date: (new Date()).toLocaleDateString()
            }
        );
    }

    receiveMessage(message) {
        console.log("received");
        console.log(message);

        this.callbacks.forEach((c) => {
            if (c.name === 'message_received') {
                c.call(message);
            }
        });
    }

    connect(username) {
        // TODO: error handling
        this.socket = openSocket('http://localhost:3001', {query: "username=" + username});
        this.socket.on('message_received', (message) => {
            this.receiveMessage(message);
        })
    }
}

export default ChatManager;
