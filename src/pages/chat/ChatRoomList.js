import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Link 컴포넌트를 임포트합니다.

const ChatRoomList = () => {
    const [chatRooms, setChatRooms] = useState([]); // 초기 상태를 빈 배열로 설정

    useEffect(() => {
        const fetchChatRooms = async () => {
            try {
                const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기
                const response = await axios.get('http://localhost:8080/chattingRoom/list', {
                    headers: {
                        'Authorization': `Bearer ${token}`, // 토큰을 Authorization 헤더에 추가
                    },
                });
                
                // 응답 데이터가 배열인지 확인
                if (Array.isArray(response.data)) {
                    setChatRooms(response.data);
                } else {
                    console.error("Received data is not an array:", response.data);
                }
            } catch (error) {
                console.error("Error fetching chat rooms:", error);
            }
        };

        fetchChatRooms();
    }, []);

    return (
        <div>
            <h2>Chat Rooms</h2>
            <ul>
                {chatRooms.length > 0 ? ( // chatRooms가 비어있지 않은 경우에만 map 실행
                    chatRooms.map(room => (
                        <li key={room.chattingRoomNo}>
                            {/* <a href={`/postList/chat/${room.chattingRoomNo}`}> */}
                            <Link to={`/chat/${room.chattingRoomNo}`}>
                                Chat Room {room.chattingRoomNo} - 
                                {room.member1No} & {room.member2No} {/* 참여 멤버 표시 */}
                            </Link>
                        </li>
                    ))
                ) : (
                    <li>현재 채팅방이 없습니다</li> // 채팅방이 없을 경우 메시지 표시
                )}
            </ul>
        </div>
    );
};

export default ChatRoomList;
