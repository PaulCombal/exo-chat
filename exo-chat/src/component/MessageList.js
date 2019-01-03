import React, {Component} from 'react';

class MessageList extends Component {
    render() {
        return (
            <ul className="message-list">
                {this.props.messages.map((message, index) => {
                    return (
                        <li key={index} className={"message " + (message.className || "message-incoming")}>
                            <div>
                                <div className="message-emitter">
                                    <span>{message.date}</span>
                                    <span>{message.senderId}</span>
                                </div>
                                <div className="message-text">
                                    {message.text}
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        )
    }
}

export default MessageList;
