import React from 'react';
import './PointHistory.css';
import defaultProfilePic from '../../images/default_pfp.png';

const PointHistory = () => {
    const nickname = "**";
    const currentPoint = 500;
    const profilePic = defaultProfilePic;

    const pointHistory = [
        { date: "2024.02.09", reason: "리뷰 작성", point: 10 },
        { date: "2024.01.29", reason: "질문 답변", point: 10 },
        { date: "2024.01.15", reason: "리뷰 작성", point: 10 },
        { date: "2024.01.10", reason: "리뷰 작성", point: 10 },
        { date: "2024.01.08", reason: "이벤트 당첨", point: 10 }
    ];

    return (
        <div>
            <h1>포인트 내역</h1>
        </div>
    );
};

export default PointHistory;