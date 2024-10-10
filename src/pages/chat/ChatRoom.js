// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import MessageList from './MessageList';
// import ChatInput from './ChatInput';

// const ChatRoom = () => {
//     const { chattingRoomNo } = useParams(); // URL 파라미터에서 chattingRoomNo 가져오기
//     const [messages, setMessages] = useState([]);
//     const [ws, setWs] = useState(null); // 웹소켓 상태

//     useEffect(() => {
//         // 웹소켓 연결
//         const token = localStorage.getItem('token');
//         const webSocket = new WebSocket(`ws://localhost:8080/chat?token=${token}&chattingRoomNo=${chattingRoomNo}`);

//         webSocket.onopen = () => {
//             console.log('WebSocket 연결됨');
//         };

//         // 서버로부터 메시지를 수신할 때마다 상태 업데이트
//         webSocket.onmessage = (event) => {
//             const newMessage = JSON.parse(event.data);
//             setMessages((prevMessages) => [...prevMessages, newMessage]); // 수신된 메시지를 상태에 추가
//         };

//         webSocket.onerror = (error) => {
//             console.error('WebSocket 오류:', error);
//         };

//         webSocket.onclose = () => {
//             console.log('WebSocket 연결 종료됨');
//         };

//         setWs(webSocket); // 웹소켓 연결 상태 설정

//         // 컴포넌트가 언마운트될 때 웹소켓 연결 종료
//         return () => {
//             webSocket.close();
//         };
//     }, [chattingRoomNo]); // chattingRoomNo가 변경될 때마다 웹소켓 연결

//     const handleSendMessage = (message) => {
//         if (ws && ws.readyState === WebSocket.OPEN) {
//             const member1_no = parseInt(localStorage.getItem('memberNo'));
//             const member2_no = parseInt(localStorage.getItem('member2No'));

//             const newMessage = {
//                 member1_no: member1_no,
//                 member2_no: member2_no,
//                 content: message,
//                 timestamp: new Date().toLocaleTimeString(),
//                 chattingRoomNo: chattingRoomNo // 현재 채팅방 번호 포함
//             };

//             ws.send(JSON.stringify(newMessage)); // 웹소켓을 통해 메시지 전송
//             setMessages((prevMessages) => [...prevMessages, newMessage]); // 새 메시지를 상태에 추가
//         } else {
//             console.log('WebSocket이 연결되어 있지 않습니다.');
//         }
//     };

//     return (
//         <div>
//             <h2>Chat Room {chattingRoomNo}</h2>
//             <MessageList messages={messages} />
//             <ChatInput onSendMessage={handleSendMessage} />
//         </div>
//     );
// };

// export default ChatRoom;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

const ChatRoom = () => {
    const { chattingRoomNo } = useParams(); // URL 파라미터에서 chattingRoomNo 가져오기
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null); // 웹소켓 상태

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/chattingRoom/${chattingRoomNo}/messages`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                console.log('Fetched messages:', response.data);
                setMessages(response.data); // 이전 메시지를 상태에 설정
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        // 이전 메시지 로드
        fetchMessages();

        // WebSocket 연결 설정
        const token = localStorage.getItem('token');
        const webSocket = new WebSocket(`ws://localhost:8080/chat?token=${token}&chattingRoomNo=${chattingRoomNo}`);

        webSocket.onopen = () => {
            console.log('WebSocket 연결됨');
        };

        // 서버로부터 메시지를 수신할 때마다 상태 업데이트
        webSocket.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, newMessage]); // 수신된 메시지를 상태에 추가
        };

        webSocket.onerror = (error) => {
            console.error('WebSocket 오류:', error);
        };

        webSocket.onclose = () => {
            console.log('WebSocket 연결 종료됨');
        };

        setWs(webSocket); // 웹소켓 연결 상태 설정

        // 컴포넌트가 언마운트될 때 웹소켓 연결 종료
        return () => {
            webSocket.close();
        };
    }, [chattingRoomNo]); // chattingRoomNo가 변경될 때마다 WebSocket 연결

    // const handleSendMessage = (message) => {
    //     if (ws && ws.readyState === WebSocket.OPEN) {
    //         const member1_no = parseInt(localStorage.getItem('memberNo'));
    //         const member2_no = parseInt(localStorage.getItem('member2No'));

    //         const newMessage = {
    //             member1_no: member1_no,
    //             member2_no: member2_no,
    //             content: message,
    //             timestamp: new Date().toLocaleTimeString(),
    //             chattingRoomNo: chattingRoomNo // 현재 채팅방 번호 포함
    //         };

    //         ws.send(JSON.stringify(newMessage)); // WebSocket을 통해 메시지 전송
    //         setMessages((prevMessages) => [...prevMessages, newMessage]); // 전송한 메시지를 상태에 추가
    //     } else {
    //         console.log('WebSocket이 연결되어 있지 않습니다.');
    //     }
    // };

    const handleSendMessage = async (message) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            const member1_no = parseInt(localStorage.getItem('memberNo'));
            const member2_no = parseInt(localStorage.getItem('member2No'));
    
            const newMessage = {
                member1_no: member1_no,
                member2_no: member2_no,
                content: message,
                timestamp: new Date().toLocaleTimeString(),
                chattingRoomNo: chattingRoomNo // 현재 채팅방 번호 포함
            };
    
            // WebSocket을 통해 메시지 전송
            ws.send(JSON.stringify(newMessage));
    
            // 메시지를 상태에 추가
            setMessages((prevMessages) => [...prevMessages, newMessage]);
    
            try {
                // 서버의 REST API를 호출하여 메시지를 데이터베이스에 저장
                const token = localStorage.getItem('token');
                await axios.post(`http://localhost:8080/chattingRoom/message`, {
                    memberNo: member1_no,
                    chattingRoomNo: chattingRoomNo,
                    content: message,
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
    
                console.log('메시지가 데이터베이스에 저장되었습니다.');
            } catch (error) {
                console.error('메시지 저장 중 오류 발생:', error);
            }
        } else {
            console.log('WebSocket이 연결되어 있지 않습니다.');
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


