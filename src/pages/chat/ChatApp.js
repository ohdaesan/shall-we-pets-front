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
            setWs(webSocket); // WebSocket 연결이 열렸을 때 ws 상태 설정
        };

        // 서버로부터 메시지를 수신할 때마다 상태 업데이트
        webSocket.onmessage = (event) => {  // ws 대신 webSocket 사용
            const newMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        // WebSocket 오류 처리
        webSocket.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

        // WebSocket 연결 종료 처리
        webSocket.onclose = () => {
            console.log('WebSocket Disconnected');
        };

        // 컴포넌트가 언마운트 될 때 WebSocket 연결 종료
        return () => {
            webSocket.close();
        };
    }, []); // 빈 배열을 넣어 처음에만 한 번 실행되게 설정

    // 메시지 보내기 함수
    const sendMessage = (messageContent) => {
        const message = {
            content: messageContent,
            timestamp: new Date().toLocaleTimeString(),
        };
        // 서버로 메시지 전송
        if (ws) {
            ws.send(JSON.stringify(message));
        } else {
            console.log('WebSocket is not connected.');
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
