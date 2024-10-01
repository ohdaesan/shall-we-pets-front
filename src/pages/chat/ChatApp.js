import React, { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { useNavigate } from 'react-router-dom';

const ChatApp = () => {
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);
    const [chattingRoomNo, setChattingRoomNo] = useState(null); // 자동 생성된 채팅방 번호 상태 추가
    const token = localStorage.getItem('token');
    let memberNo = null;
    const member2No = 2;
    const navigate = useNavigate();

    // 채팅방 생성 및 웹소켓 연결
    useEffect(() => {
        if (token) {

            // 토큰으로 memberNo 추출
            // const claims = TokenUtils.getClaimsFromToken(token);
            // memberNo = claims.memberNo;

            console.log(token);

            // 채팅방 생성
            fetch('http://localhost:8080/chattingRoom/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    member1_no: memberNo, // 손님 ID
                    member2_no: member2No // 업체 ID
                })
            })
                .then(response => response.json())
                .then(data => {
                    const newChattingRoomNo = data.chattingRoomNo;
                    setChattingRoomNo(newChattingRoomNo);

                    // 오대산 주소 채팅 화면으로 연결
                    navigate('/postList/chat');

                    // WebSocket 연결
                    const webSocket = new WebSocket(`ws://localhost:8080/chat?token=${token}`); // WebSocketUrl

                    webSocket.onopen = () => {
                        console.log('WebSocket Connected');
                        setWs(webSocket); // WebSocket 연결이 열렸을 때 ws 상태 설정
                    
                    //     // 메세지에 토큰 정보를 담아 헤더로 전달하는 방식 --> 실패
                    // const authMessage = { token };
                    // webSocket.send(JSON.stringify(authMessage)); // 인증 메시지 전송
                
                    };

                    

                    // 서버로부터 메시지를 수신할 때마다 상태 업데이트
                    webSocket.onmessage = (event) => {
                        const newMessage = JSON.parse(event.data);
                        setMessages((prevMessages) => [...prevMessages, newMessage]);
                    };

                    webSocket.onerror = (error) => {
                        console.error('WebSocket Error:', error);
                    };

                    webSocket.onclose = () => {
                        console.log('WebSocket Disconnected');
                        setWs(null);
                    };
                })
                .catch(error => console.error('Error creating chat room:', error));
        } else {
            console.log('토큰이 없습니다');
        }
    }, [token , memberNo]);

    // 메시지 보내기 함수
    const sendMessage = (messageContent) => {
        const message = {
            content: messageContent,
            chattingRoomNo: chattingRoomNo,
            memberNo: memberNo,
            member2No: member2No,
            timestamp: new Date().toLocaleTimeString(),
        };

        // WebSocket 연결이 되었을 때만 메세지 전송
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(message));
        } else {
            console.log('WebSocket is not connected.');
        }

        // 메시지 백엔드에 저장
        if (chattingRoomNo) {
            fetch('http://localhost:8080/chattingRoom/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    memberNo: memberNo,
                    member2No: member2No, // 유저들의 memberNo
                    chattingRoomNo: chattingRoomNo, // 자동 생성된 채팅방 번호 사용
                    content: messageContent
                })
            })
                .then(response => response.json())
                .then(data => console.log('Message saved:', data))
                .catch(error => console.error('Error saving message:', error));
        }
    };

    return (
        <div className="chatApp">
            <ChatHeader />
            <MessageList messages={messages} />
            <ChatInput onSendMessage={sendMessage} />
        </div>
    );
};

export default ChatApp;
