import React, { useState, useEffect } from 'react';
import './PointHistory.css';
import defaultProfilePic from '../../images/default_pfp.png';
import { getPointListAPI, getMemberPointsAPI } from '../../apis/PointAPI';
import { findNickname } from '../../apis/ReviewAPICalls';

const PointHistory = () => {
    const [currentPoint, setCurrentPoint] = useState(0);
    const [pointHistory, setPointHistory] = useState([]);
    const [memberNickname, setMemberNickname] = useState('Unknown');
    const profilePic = defaultProfilePic;
    const memberNo = localStorage.getItem('memberNo');

    // 포인트 내역 및 현재 포인트 API 호출
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 현재 포인트 조회
                const memberPointsResponse = await getMemberPointsAPI(memberNo);
                setCurrentPoint(memberPointsResponse.results.totalPoints);

                // 포인트 내역 조회
                const pointListResponse = await getPointListAPI(memberNo);
                // pointsData에 pointNo 추가하고 정렬
                const pointsData = pointListResponse.results.points
                    .map(point => ({
                        date: `${point.createdDate[0]}.${String(point.createdDate[1]).padStart(2, '0')}.${String(point.createdDate[2]).padStart(2, '0')}`,
                        reason: point.comment,
                        point: point.point,
                        pointNo: point.pointNo // pointNo 추가
                    }))
                    .sort((a, b) => b.pointNo - a.pointNo); // pointNo 기준으로 내림차순 정렬

                setPointHistory(pointsData);

                // 유저 닉네임 불러오기 
                const memberNicknameResponse = await findNickname(memberNo);
                setMemberNickname(memberNicknameResponse?.results?.nickname || 'Unknown');
                
            } catch (error) {
                console.error("불러오지 못했습니다.:", error);
            }
        };

        fetchData();
    }, [memberNo]);

    return (
        <div className="pointhistory-body">
            <h2 className="pointhistory-title">나의 포인트</h2>
            <div className="pointhistory-container">
                <div className="pointhistory-summary">
                    <img src={profilePic} alt="Profile" className="pointhistory-profile-img" />
                    <div className="pointhistory-info">
                        <p><span className="pointhistory-nickname">{memberNickname}</span> 님의 포인트는</p>
                        <p className="pointhistory-value"><span className="pointhistory-current-point">{currentPoint}</span>pt 입니다.</p>
                    </div>
                    <br/>
                    <hr/>
                </div>
                <div className="pointhistory-history">
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
                                    <td>{item.point} pt</td>
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
