import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ChatInput extends Component {
    static propTypes = {
        onSubmitMessage: PropTypes.func.isRequired,
    };
    state = {
        message: '',
    };

    render() {
        return (
            <div id="chatInputWrapper">
                <form
                action="."
                onSubmit={e=> {
                    e.preventDefault();
                    this.props.onSubmitMessage(this.state.message);
                    this.setState({ message: ''});
                }}>
                <input
                id = "chatInput"
                type="text"
                placeholder={'Enter message...'}
                value={this.state.message}
                onChange={e => this.setState({ message: e.target.value })}
                />
                <input id="chatButton" type="submit" value={'Send'} />
                    </form>
            </div>
        )
    }
}

export default ChatInput;