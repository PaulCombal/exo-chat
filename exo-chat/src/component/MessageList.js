import React, {Component} from 'react';
import ReactDOM from "react-dom";

class MessageList extends Component {

    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.messageList).addEventListener('DOMNodeInserted', function () {
            this.scrollTop = this.scrollHeight;
        });
    }

    render() {
        return (
            <ul className="message-list" ref="messageList">
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
