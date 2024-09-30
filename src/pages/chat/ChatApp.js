import React, { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

const ChatApp = () => {
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);

    // 웹소켓 연결 및 메시지 처리
    useEffect(() => {
        const webSocket = new WebSocket('ws://localhost:3000/chat'); // WebSocketUrl

        webSocket.onopen = () => {
            console.log('WebSocket Connected');
        };

        // 서버로부터 메시지를 수신할 때마다 상태 업데이트
        ws.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        return () => webSocket.close(); // 컴포넌트 언마운트 시 웹소켓 연결 종료
    }, []);

    // 메시지 보내기 함수
    const sendMessage = (messageContent) => {
        const message = {
            content: messageContent,
            timestamp: new Date().toLocaleTimeString(),
        };
        // 서버로 메시지 전송
        if (ws) {
            ws.send(JSON.stringify(message));
        }
    };

    return (
        <div className="chatApp">
            <ChatHeader />
            <MessageList messages={messages} />
            <ChatInput sendMessage={sendMessage} />
        </div>
    );
};

export default ChatApp;
