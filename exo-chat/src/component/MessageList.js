import React, {Component} from 'react';

class MessageList extends Component {
    render() {
        return (
            <ul className="message-list">
                {this.props.messages.map((message, index) => {
                    return (
                        <li key={index} className="message">
                            <div>
                                <span>{message.date}</span> <span>{message.senderId}</span>: {message.text}
                            </div>
                        </li>
                    );
                })}
            </ul>
        )
    }
}

export default MessageList;
