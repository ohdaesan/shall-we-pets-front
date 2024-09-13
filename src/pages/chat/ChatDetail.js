import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './ChatDetail.css';


// 서버의 WebSocket URL을 여기에 입력하세요.
const SOCKET_SERVER_URL = 'http://localhost:4000';

const ChatDetail = () => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        // Socket.io 클라이언트 연결 설정
        const newSocket = io(SOCKET_SERVER_URL);
        setSocket(newSocket);

        // 메시지 수신
        newSocket.on('receive_message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // 컴포넌트 언마운트 시 소켓 연결 종료
        return () => newSocket.close();
    }, []);

    const sendMessage = () => {
        if (messageInput.trim() === '') return;
        socket.emit('send_message', messageInput);
        setMessageInput('');
    };

    return (
        <div>
            <h2>Chat</h2>
            <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatDetail;
