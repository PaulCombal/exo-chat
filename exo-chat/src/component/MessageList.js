import React, {Component} from 'react';

class MessageList extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <ul className="message-list">
                <li>
                    <div className="message message-general">
                        <div className="message-text">
                            Bienvenue dans le chat!
                        </div>
                    </div>
                </li>
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
