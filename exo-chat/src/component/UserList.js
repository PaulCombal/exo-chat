import React, { Component } from 'react';

class UserList extends Component {
    render() {
        return (
            <ul className="message-list">
                {this.props.users.map((username, index) => {
                    return (
                        <li  key={index} className="user">
                            <div>{username}</div>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default UserList;
