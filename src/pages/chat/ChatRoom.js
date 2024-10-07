import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

const ChatRoom = () => {
    const { chattingRoomNo } = useParams(); // URL 파라미터에서 chattingRoomNo 가져오기
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/chattingRoom/${chattingRoomNo}/messages`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                setMessages(response.data); // 메시지 상태 업데이트
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, [chattingRoomNo]); // chattingRoomNo가 변경될 때마다 메시지 가져오기

    const handleSendMessage = async (message) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:8080/chattingRoom/${chattingRoomNo}/send`, { content: message }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            setMessages((prevMessages) => [...prevMessages, { content: message }]); // 새 메시지를 상태에 추가
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div>
            <h2>Chat Room {chattingRoomNo}</h2>
            <MessageList messages={messages} />
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatRoom;
