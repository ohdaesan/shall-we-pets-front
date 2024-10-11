import React from 'react';

const MessageList = ({ messages }) => {
    return (
        <div className="messageList">
            {messages.map((message, index) => (
                <div key={index} className={`message ${message.isUser ? 'user-message' : 'other-message'}`}>
                    <span className="member-number">Member No: {message.memberNo}</span>
                    <p>{message.content}</p>
                    <span>{message.timestamp}</span>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
