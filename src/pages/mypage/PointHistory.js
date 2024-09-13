import React, { useEffect, useState } from 'react';
import profilePic from '../../images/default_pfp.png'; 

const PointHistory = () => {

    const nickname = "홍길동";
    const currentPoint = 50;


    const [pointHistory, setPointHistory] = useState([
        { date: "2024.02.09", reason: "리뷰 작성", point: 10 },
        { date: "2024.01.29", reason: "질문 답변", point: 10 },
        { date: "2024.01.15", reason: "리뷰 작성", point: 10 },
        { date: "2024.01.10", reason: "리뷰 작성", point: 10 },
        { date: "2024.01.08", reason: "이벤트 당첨", point: 10 }
    ]);

    // Effect to run when component mounts (optional if you have async data fetching)
    useEffect(() => {
        // You can perform data fetching or other side effects here if needed
    }, []);

    return (
        <div>
            <h1>내 포인트 내역</h1>
            <img src={profilePic} alt="Profile" className="profile-pic" />
            <p id="nickname">{nickname}</p>님의 현재 포인트는
            <p id="currentPoint">{currentPoint} pt</p> 입니다.

            <table>
                <thead>
                    <tr>
                        <th>날짜</th>
                        <th>사유</th>
                        <th>포인트</th>
                    </tr>
                </thead>
                <tbody>
                    {pointHistory.map((item, index) => (
                        <tr key={index}>
                            <td>{item.date}</td>
                            <td>{item.reason}</td>
                            <td>+{item.point} pt</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PointHistory;
