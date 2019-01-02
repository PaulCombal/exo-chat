import React, {Component} from 'react';
import MessageList from './component/MessageList';
import InputForm from './component/InputForm';
import ChatManager from './controller/ChatManager';
import UserList from './component/UserList';
import logo from './logo.svg';
import './App.scss';

class App extends Component {

    constructor() {
        super();
        this.state = {
            messages: [],
            users: []
        };
        this.chatManager = new ChatManager();
        this.localUsername = 'user' + Math.floor(Math.random() * 1000);
    }

    componentDidMount() {
        // Todo: loading screen while not connected
        fetch("http://localhost:3001/get_users.json")
            .then(r => r.json())
            .then((users) => {
                this.state.users = users;
                this.setState(this.state);
            });

        this.chatManager.addCallback(
            'message_received',
            (message) => {
                this.state.messages.push(message);
                this.setState(this.state);
            }
        );

        this.chatManager.addCallback(
            'user_disconnected',
            (username) => {
                this.state.users = this.state.users.filter((value) => value !== username);
                this.setState(this.state);
            }
        );

        this.chatManager.addCallback(
            'user_connected',
            (username) => {
                this.state.users.push(username);
                this.setState(this.state);
            }
        );

        this.chatManager.connect(this.localUsername);
    }

    render() {
        return (
            <div className="App">
                <header>
                    <h1>
                        Vous êtes {this.localUsername}
                    </h1>
                </header>

                <MessageList
                    messages={this.state.messages}
                />

                <InputForm
                    sendMessageCallback={(message) => this.chatManager.sendMessage(message)}
                />

                <UserList users={this.state.users}/>
            </div>
        );
    }
}

export default App;
