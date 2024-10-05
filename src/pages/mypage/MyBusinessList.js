import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyBusinessList.css';
import businessProfilePic from '../../images/pension.png';

import { getMyBusinessListAPI, deleteBusinessAPI } from '../../apis/MyInfoAPICalls'; // API 함수 import 경로를 적절히 조정해주세요


const MyBusinessList = () => {
    const [PostData, setPostData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBusinessList();
    }, []);

    const fetchBusinessList = async () => {
        try {
            const memberNo = localStorage.getItem('memberNo');
            const data = await getMyBusinessListAPI(memberNo);
            setPostData(data);
        } catch (error) {
            console.error('Error fetching business list:', error);
            alert('업체 목록을 불러오는 데 실패했습니다.');
        }
    };

    const handleDelete = async (postNo) => {
        if (window.confirm('해당 업체를 삭제하시겠습니까?')) {
            try {
                const memberNo = localStorage.getItem('memberNo');
                await deleteBusinessAPI(postNo, memberNo);
                alert('업체가 성공적으로 삭제되었습니다.');
                fetchBusinessList(); // 목록 새로고침
            } catch (error) {
                console.error('Error deleting business:', error);
                alert('업체 삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
    };

    const handleModify = (postNo) => {
        navigate(`/mypage/mybusinesslist/${postNo}`);
    };

    const getStatusClassName = (status) => {
        switch (status) {
            case '승인':
            case '승인 대기중':
                return 'mybusinesslist-approvedOrPending';
            case '반려':
                return 'mybusinesslist-rejected';
            default:
                return '';
        }
    };

    return (
        <div className="mybusinesslist-container">
            <h2 className="mybusinesslist-title">내 업체 조회</h2>
            <div className="mybusinesslist-content">
                {PostData.map((post) => (
                    <div key={post.postNo} className="mybusinesslist-item">
                        <div className="mybusinesslist-item-left">
                            <img src={businessProfilePic} alt="Business Profile" className="mybusinesslist-profile-pic" />
                        </div>
                        <div className="mybusinesslist-item-right">
                            <h3 className="mybusinesslist-item-name">{post.title}</h3>
                            <p className="mybusinesslist-item-address">{post.content}</p>
                            <p className={`mybusinesslist-item-status ${getStatusClassName(post.categoryName)}`}>{post.categoryName}</p>
                            <div className="mybusinesslist-item-actions">
                                <button onClick={() => handleModify(post.postNo)} className="mybusinesslist-modify-btn">수정</button>
                                <button onClick={() => handleDelete(post.postNo)} className="mybusinesslist-delete-btn">삭제</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBusinessList;