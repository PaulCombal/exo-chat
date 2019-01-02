import React, {Component} from 'react';
import MessageList from './component/MessageList';
import InputForm from './component/InputForm';
import ChatManager from './controller/ChatManager';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
            messages: []
        };
        this.chatManager = new ChatManager();
        this.localUsername = 'user' + Math.floor(Math.random() * 1000);
    }

    componentDidMount() {
        // Todo: loading screen while not connected
        this.chatManager.addCallback(
            'message_received',
            (message) => this.setState({
                messages: [...this.state.messages, message]
            })
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
            </div>
        );
    }
}

export default App;
