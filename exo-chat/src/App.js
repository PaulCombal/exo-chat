import React, { Component } from 'react';
import MessageList from './component/MessageList';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    id;
  render() {
    return (
      <div className="App">
        <header>
          <h1>
            Mon super chat
          </h1>
        </header>

        <MessageList
          messages={[{id: "Mon ID", senderId: "1111", text: "Mon etxte"}]}
        />
      </div>
    );
  }
}

export default App;
