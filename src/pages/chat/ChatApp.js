import React, { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
// import { useNavigate } from 'react-router-dom';
import TokenUtils from './TokenUtils';

const ChatApp = () => {
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);
    const [chattingRoomNo, setChattingRoomNo] = useState(null); // 자동 생성된 채팅방 번호 상태 추가
    const token = localStorage.getItem('token');
    // const ws = new WebSocket(`ws://localhost:8080/chat?token=${token}`);
    const memberNo = localStorage.getItem('memberNo');
    // let memberNo = null;
    // if (token) {
    //     const claims = TokenUtils.getClaimsFromToken(token);
    //     console.log(claims); // claims 안에 데이터 있는지 확인하기

    //     memberNo = claims.sub; // 토큰에 memberNo가 포함되지 않아서
    //                            // memberNo 대신 sub를  추출
    // }
    console.log(memberNo);
    console.log(`Connecting to WebSocket at ws://localhost:8080/chat?token=${token}`);

    const member2No = 2;
    // const navigate = useNavigate(); /*주소 직접 연결 설정하려고 했으나 실패*/

    // 채팅방 생성 및 웹소켓 연결
    useEffect(() => {
        if (token && memberNo) {

            console.log('Token:', token);
            console.log('MemberNo:', memberNo);


            // 채팅방 생성
            fetch('http://localhost:8080/chattingRoom/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    // `Bearer ${token}`에서 변경
                    // localStorage.getItem('token')에서 재변경
                },
                body: JSON.stringify({
                    member1_no: memberNo, // 손님 ID
                    member2_no: member2No // 업체 ID
                })
            })
                .then(response => {
                    if (!response.ok) { // 응답이 정상인지 체크
                        throw new Error('방 생성에 실패함');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('채팅방 생성 응답 데이터:', data); // 응답 데이터 확인하기
                    const newChattingRoomNo = data.chattingRoomNo;
                    

                    if (newChattingRoomNo) {
                        setChattingRoomNo(newChattingRoomNo);
                        console.log('새로운 채팅방 번호:', newChattingRoomNo);

                    

                    // // 오대산 주소 채팅 화면으로 연결 --> 실패
                    // navigate('/postList/chat');

                    // WebSocket 연결
                    const webSocket = new WebSocket(`ws://localhost:8080/chat?token=${token}`); // WebSocketUrl

                    webSocket.onopen = () => {
                        console.log('WebSocket Connected');
                        // setWs(webSocket); // WebSocket 연결이 열렸을 때 ws 상태 설정
                        // 메세지에 토큰 정보를 담아 헤더로 전달하는 방식 --> 실패
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
                        // setWs(null);
                    };
                } else {
                    console.error('채팅방 번호가 응답에 없음');

                }
        })
        .catch(error => console.error('Error creating chat room:', error));
} else {
    console.log('토큰이 없거나 memberNo가 없습니다');
        }
    }, [token, memberNo]);

// 메시지 보내기 함수
const sendMessage = (messageContent) => {
    console.log('chattingRoomNo:', chattingRoomNo);
    console.log('memberNo:', memberNo);


    if (!chattingRoomNo || !memberNo || !ws || ws.readyState !== WebSocket.OPEN) {
        console.log('메시지를 보낼 수 없습니다.');
        return;
    }

    const message = {
        content: messageContent,
        chattingRoomNo: chattingRoomNo,
        memberNo: memberNo,
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
