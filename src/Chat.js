import React, { Component } from 'react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

const URL = 'wss://aaronislonely.com'; // to-do add dynamic support for ws vs wss depending on http/https

class Chat extends Component {
    state = {
        name: 'user' + Math.floor(Math.random() * 9999),
        messages: [],
    };

    ws = new WebSocket(URL);
    heartbeatInterval = null; // Store the interval ID

    componentDidMount() {
        this.ws.onopen = () => {
            console.log('connected', Date.now());
            this.startHeartbeat(); // Start heartbeat when connected
        };

        this.ws.onmessage = evt => {
            if (!(evt.data === 'ping')) {
                const message = JSON.parse(evt.data);
                this.addMessage(message);
            }
        };

        this.ws.onclose = () => {
            console.log('disconnected', Date.now());
            this.setState({ ws: new WebSocket(URL) });
            this.stopHeartbeat(); // Stop heartbeat on disconnect
        };
    }

    componentWillUnmount() {
        this.stopHeartbeat(); // Clean up on unmount
        this.ws.close(); // Close the WebSocket connection
    }

    startHeartbeat() {
        this.heartbeatInterval = setInterval(() => {
            if (this.ws.readyState === WebSocket.OPEN) {
                this.ws.send('ping'); // Send a simple ping message
	    }
        }, 30000); // Send heartbeat every 30 seconds
    }

    stopHeartbeat() {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval); // Clear the interval
            this.heartbeatInterval = null;
        }
    }

    addMessage = message => {
        this.setState(state => ({ messages: [message, ...state.messages] }));
    };

    submitMessage = messageString => {
        const message = { name: this.state.name, message: messageString };
        this.ws.send(JSON.stringify(message));
        this.addMessage(message);
    };

    render() {
        return (
            <div>
                <div className="chatBox">
                    <div className="panel-chat">
                        <div className="header-chat">
                            <label htmlFor="name">
                                Name:&nbsp;
                                <input
                                    type="text"
                                    id={'chatName'}
                                    placeholder={'Enter your name...'}
                                    value={this.state.name}
                                    onChange={e => this.setState({ name: e.target.value })}
                                />
                            </label>
                        </div>
                        <div className="body-chat">
                            {this.state.messages.map((message, index) =>
                                <ChatMessage
                                    key={index}
                                    message={message.message}
                                    name={message.name}
                                />,
                            )}
                        </div>
                        <div className="message-chat">
                            <ChatInput
                                ws={this.ws}
                                onSubmitMessage={messageString => this.submitMessage(messageString)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;

