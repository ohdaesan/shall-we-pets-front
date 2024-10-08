import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

// const ChatRoom = () => {
//     const { chattingRoomNo } = useParams(); // URL 파라미터에서 chattingRoomNo 가져오기
//     const [messages, setMessages] = useState([]);
//     const [ws, setWs] = useState(null); // 웹소켓 상태

//     useEffect(() => {
//         // WebSocket 연결 설정
//         const token = localStorage.getItem('token');
//         const webSocket = new WebSocket(`ws://localhost:8080/chat?token=${token}&chattingRoomNo=${chattingRoomNo}`);

//         webSocket.onopen = () => {
//             console.log('WebSocket 연결됨');
//             // 채팅방에 입장할 때 서버에 이전 메시지 요청을 보낼 수 있음
//             const loadMessagesRequest = {
//                 type: "LOAD_MESSAGES", // 메시지 요청 타입 정의
//                 chattingRoomNo: chattingRoomNo
//             };
//             webSocket.send(JSON.stringify(loadMessagesRequest));
//         };

//         // 서버로부터 메시지를 수신할 때마다 상태 업데이트
//         webSocket.onmessage = (event) => {
//             const response = JSON.parse(event.data);
//             if (response.type === 'MESSAGE') {
//                 // 새로운 채팅 메시지 수신 시
//                 const newMessage = response.data;
//                 setMessages((prevMessages) => [...prevMessages, newMessage]); // 수신된 메시지를 상태에 추가
//             } else if (response.type === 'LOAD_MESSAGES') {
//                 // 서버로부터 이전 메시지를 수신 시
//                 const pastMessages = response.data;
//                 setMessages(pastMessages); // 과거 메시지로 상태 설정
//             }
//         };

//         webSocket.onerror = (error) => {
//             console.error('WebSocket 오류:', error);
//         };

//         webSocket.onclose = () => {
//             console.log('WebSocket 연결 종료됨');
//         };

//         setWs(webSocket); // WebSocket 상태 설정

//         // 컴포넌트가 언마운트될 때 WebSocket 연결 종료
//         return () => {
//             webSocket.close();
//         };
//     }, [chattingRoomNo]); // chattingRoomNo가 변경될 때마다 WebSocket 연결

//     const handleSendMessage = (message) => {
//         if (ws && ws.readyState === WebSocket.OPEN) {
//             const member1_no = parseInt(localStorage.getItem('memberNo'));
//             const member2_no = parseInt(localStorage.getItem('member2No'));

//             const newMessage = {
//                 type: 'MESSAGE', // 메시지 타입 정의
//                 member1_no: member1_no,
//                 member2_no: member2_no,
//                 content: message,
//                 timestamp: new Date().toLocaleTimeString(),
//                 chattingRoomNo: chattingRoomNo // 현재 채팅방 번호 포함
//             };

//             ws.send(JSON.stringify(newMessage)); // WebSocket을 통해 메시지 전송
//             setMessages((prevMessages) => [...prevMessages, newMessage]); // 전송한 메시지를 상태에 추가
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

const ChatRoom = () => {
    const { chattingRoomNo } = useParams(); // URL 파라미터에서 chattingRoomNo 가져오기
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null); // 웹소켓 상태

    useEffect(() => {
        // 웹소켓 연결
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
    }, [chattingRoomNo]); // chattingRoomNo가 변경될 때마다 웹소켓 연결

    const handleSendMessage = (message) => {
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

            ws.send(JSON.stringify(newMessage)); // 웹소켓을 통해 메시지 전송
            setMessages((prevMessages) => [...prevMessages, newMessage]); // 새 메시지를 상태에 추가
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

// const ChatRoom = () => {
//     const { chattingRoomNo } = useParams(); // URL 파라미터에서 chattingRoomNo 가져오기
//     const [messages, setMessages] = useState([]);

//     useEffect(() => {
//         const fetchMessages = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios.get(`http://localhost:8080/chattingRoom/${chattingRoomNo}/messages`, {
//                     // 
//                     // http://localhost:8080/api/chatrooms/${chattingRoomNo}/messages
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 });

//                 console.log('Fetched messages:', response.data);
//                 setMessages(response.data); // 메시지 상태 업데이트
//             } catch (error) {
//                 console.error("Error fetching messages:", error);
//             }
//         };

//         fetchMessages();
//     }, [chattingRoomNo]); // chattingRoomNo가 변경될 때마다 메시지 가져오기

//     const handleSendMessage = async (message) => {
//         try {
//             const token = localStorage.getItem('token');

//             await axios.post(`http://localhost:8080/chattingRoom/message`, {
//                 content: message,
//                 timestamp: new Date().toLocaleTimeString()
//             }, {
//                 // http://localhost:8080/chattingRoom/${chattingRoomNo}/send
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });

//             setMessages((prevMessages) => [...prevMessages, {
//                 content: message,
//                 timestamp: new Date().toLocaleTimeString(), // 현재 시간     
//             }]); // 새 메시지를 상태에 추가
//         } catch (error) {
//             console.error("Error sending message:", error);
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
