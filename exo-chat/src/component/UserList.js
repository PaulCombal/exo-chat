import React, {Component} from 'react';

class UserList extends Component {
    clickedCallback(username) {
        // TODO: refactor (global events system?) Ugly AF
        let input = document.getElementsByTagName('input')[0];
        input.value = '@' + username + input.value + ' ';
        input.focus();
    }
    render() {
        return (
            <div className="user-list">
                <h4>
                    Utilisateurs connectés:
                </h4>
                <ul>
                    {
                        this.props.users.map(
                            (username, index) => {
                                return (
                                    <li key={index} className="user">
                                        <div className="user-link" onClick={() => this.clickedCallback(username)}>@{username}</div>
                                    </li>
                                );
                            }
                        )
                    }
                </ul>
            </div>
        )
    }
}

export default UserList;
