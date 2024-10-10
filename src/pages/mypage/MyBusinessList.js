import React, { useEffect, useState } from 'react';
import './MyBusinessList.css';
import businessProfilePic from '../../images/pension.png';

import { deleteBusinessAPI } from '../../apis/MyInfoAPICalls'; // API 함수 import 경로를 적절히 조정해주세요
import { getPostByMemberNoAPI } from '../../apis/PostAPICalls';


const MyBusinessList = () => {
    const [businessList, setBusinessList] = useState([]);
    const memberNo = localStorage.getItem('memberNo');

    useEffect(() => {
        const fetchBusinessData = async () => {
            if (!memberNo) return;
            try {
                const data = await getPostByMemberNoAPI(memberNo);
                if (data.httpStatusCode === 200) {
                    const postListArray = Array.isArray(data.results.postList) ? data.results.postList : [];
                    const filteredPosts = postListArray.filter(post => post.memberNo === parseInt(memberNo));

                    const businesses = filteredPosts.map(post => ({
                        postNo: post.postNo,
                        fclty_nm: post.fcltyNm,
                        rdnmadr_nm: post.rdnmadrNm,
                        status: post.status,
                    }));

                    setBusinessList(businesses);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error("Error fetching business data:", error);
            }
        };

        fetchBusinessData();
    }, [memberNo]);

    const handleDelete = async (postNo) => {
        if (window.confirm('해당 업체를 삭제하시겠습니까?')) {
            try {
                await deleteBusinessAPI(postNo, memberNo);
                alert('업체가 성공적으로 삭제되었습니다.');
                setBusinessList(businessList.filter(post => post.postNo !== postNo)); // Update list without re-fetching
            } catch (error) {
                console.error('Error deleting business:', error);
                alert('업체 삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
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
                {businessList.map((post) => (
                    <div key={post.postNo} className="mybusinesslist-item">
                        <div className="mybusinesslist-item-left">
                            <img src={businessProfilePic} alt="Business Profile" className="mybusinesslist-profile-pic" />
                        </div>
                        <div className="mybusinesslist-item-right">
                            <h3 className="mybusinesslist-item-name">{post.fclty_nm}</h3>
                            <p className="mybusinesslist-item-address">{post.rdnmadr_nm}</p>
                            <p className={`mybusinesslist-item-status ${getStatusClassName(post.status)}`}>
                                {post.status === "승인" ? "승인" : post.status === "승인 대기중" ? "대기중" : "미승인"}
                            </p>
                        
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBusinessList;