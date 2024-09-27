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
        <div className="point-body">
            <h2 className="point-title">나의 포인트</h2>
            <div className="point-container">
                <div className="point-summary">
                    <img src={profilePic} alt="Profile" className="profile-img" />
                    <div className="point-info">
                    <p><span className="nickname">{nickname}</span> 님의 포인트는</p>
                    <p className="point-value"><span className="current-point">{currentPoint}</span>pt 입니다.</p>
                    </div>
                    <br/>
                    <hr/>
                </div>
                <div className="point-history">
                    <h3>나의 포인트 목록</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>날짜</th>
                                <th>지급 사유</th>
                                <th>지급포인트</th>
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
            </div>
        </div>
    );
};

export default PointHistory;