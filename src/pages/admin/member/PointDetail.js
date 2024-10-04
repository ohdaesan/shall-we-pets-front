import React, { useState, useEffect } from 'react'; // useState, useEffect 추가
import './PointDetail.css';
import NavBar from './NavBar';
import { getMemberPointsAPI, getPointListAPI, getAddPoint } from '../../../apis/PointAPI';
import { findNickname } from '../../../apis/ReviewAPICalls';
import { useParams } from 'react-router-dom';

const PointDetail = () => {
    const [currentPoint, setCurrentPoint] = useState(0);
    const [pointHistory, setPointHistory] = useState([]);
    const [memberNickname, setMemberNickname] = useState('Unknown');
    const { memberNo } = useParams();
    
    // 포인트 조정 관련 상태 추가
    const [pointInput, setPointInput] = useState('');
    const [commentInput, setCommentInput] = useState('');
    const [isAddingPoints, setIsAddingPoints] = useState(false); // 포인트 조정 UI 표시 여부

    // 데이터 가져오는 함수 정의
    const fetchData = async () => {
        try {
            // 현재 포인트 조회
            const memberPointsResponse = await getMemberPointsAPI(memberNo);
            setCurrentPoint(memberPointsResponse.results.totalPoints);

            // 포인트 내역 조회
            const pointListResponse = await getPointListAPI(memberNo);
            const pointsData = pointListResponse.results.points.map(point => ({
                date: `${point.createdDate[0]}.${String(point.createdDate[1]).padStart(2, '0')}.${String(point.createdDate[2]).padStart(2, '0')}`,
                reason: point.comment,
                point: point.point, // point 데이터를 올바르게 할당
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

    useEffect(() => {
        fetchData(); // 컴포넌트가 마운트될 때 데이터 가져오기
    }, [memberNo]);

    // 포인트 조정 함수
    const handleAddPoints = async () => {
        try {
            const response = await getAddPoint({
                memberNo: memberNo, // 현재 사용자의 memberNo
                point: Number(pointInput), // 포인트를 숫자로 변환
                comment: commentInput // 코멘트
            });
    
            console.log('포인트 추가 응답:', response); // API 응답 로그 추가
    
            if (response.httpStatusCode === 200) {
                alert('포인트가 성공적으로 조정되었습니다.');
                setPointInput('');
                setCommentInput('');
                setIsAddingPoints(false);
                fetchData(); // 데이터 다시 가져오기
            } else {
                alert('포인트 조정에 실패했습니다.'); // 실패 시 메시지
            }
        } catch (error) {
            console.error("포인트 조정 중 오류 발생:", error);
            alert('포인트 조정에 실패했습니다.'); // 오류 발생 시 메시지 추가
        }
    };
    
    return (
        <div className="point-detail-container">
            <NavBar />
            <div className="point-detail">
                <h2>{memberNickname}님의 포인트 <b/>
                    <button className='point-plus' onClick={() => setIsAddingPoints(!isAddingPoints)}>
                        포인트 조정하기
                    </button>
                </h2>
                {isAddingPoints && (
                    <div className="add-point-form">
                        <input
                            type="number"
                            value={pointInput}
                            onChange={(e) => setPointInput(e.target.value)}
                            placeholder="포인트"
                        />
                        <input
                            type="text"
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            placeholder="사유"
                        />
                        <button className='appPoint-button' onClick={handleAddPoints}>등록하기</button>
                    </div>
                )}
                <div className="total-points">
                    <h3>{memberNickname}님의 포인트는</h3>
                    <p>{currentPoint} pt</p>
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
                        {pointHistory.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.date}</td>
                                <td>{entry.reason}</td>
                                <td>{entry.point} pt</td> {/* point로 변경 */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PointDetail;
