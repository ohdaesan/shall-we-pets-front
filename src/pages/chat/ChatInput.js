import React, { useState } from 'react';

const ChatInput = ({ onSendMessage }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSendMessage(inputValue);
            setInputValue(''); // 메시지 전송 후 입력란 초기화
        }
    };

    return (
        <form className="chatInput" onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="질문을 입력해주세요"
            />
            <button type="submit">입력</button>
        </form>
    );
};

export default ChatInput;
