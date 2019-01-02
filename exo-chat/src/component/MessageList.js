import React, { Component } from 'react';

class MessageList extends Component {
    render() {
        return (
            <ul className="message-list">
                {this.props.messages.map((message, index) => {
                    return (
                        <li  key={message.id} className="message">
                            <div>{message.senderId} - le {message.date}</div>
                            <div>{message.text}</div>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default MessageList;
