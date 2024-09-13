// 회원정보페이지 - 포인트 내역

import React from 'react';
import './PointDetail.css';
import NavBar from './NavBar';

function PointDetail() {
    const pointsData = [
        { date: '2024.02.09', reason: '리뷰 작성', points: 10 },
        { date: '2024.01.19', reason: '리뷰 작성', points: 10 },
        { date: '2024.01.15', reason: '리뷰 작성', points: 10 },
        { date: '2024.01.10', reason: '리뷰 작성', points: 10 },
        { date: '2024.01.08', reason: '이벤트 참여', points: 10 }
    ];

    // 총 포인트 
    const totalPoints = pointsData.reduce((acc, item) => acc + item.points, 0);

    return (
        <div className="point-detail-container">
            <NavBar />
            <div className="point-detail">
                <h2>**님의 포인트</h2>
                <div className="total-points">
                    <h3>**님의 포인트는</h3>
                    <p>{totalPoints} pt</p>
                </div>
                <table className="points-table">
                    <thead>
                        <tr>
                            <th>날짜</th>
                            <th>지급 사유</th>
                            <th>지급 포인트</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pointsData.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.date}</td>
                                <td>{entry.reason}</td>
                                <td>+{entry.points} pt</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
            );
}

            export default PointDetail;