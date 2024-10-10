import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ApplyDetail.css';
import ApplyDetailDefault from '../../../images/ApplyDetailDefault.png';
import ApplyDetailDefault2 from '../../../images/reviewpic6.jpg';
import { getPostDetailAPI } from '../../../apis/PostAPICalls';
import { deletePostAwaitingListAPI, updatePostStatusAPI } from '../../../apis/PostRegisterAPICalls';

function ApplyDetail() {
    const { postNo } = useParams();
    const [form, setForm] = useState({
        ownerName: '',
        businessName: '',
        contactNumber: '',
        businessHours: '',
        website: '',
        businessType: '',
        additionalInfo: '',
        address: '',
        detailAddress: '',
        zipCode: '',
        statusExplanation: '',
        detailedClassification: '',
        speciesRestriction: '',
        petSizeRestriction: '',
        hasPetExclusiveSeats: false,
        hasSpaceLimitations: false,
        hasParking: false,
    });

    const [profilePics, setProfilePics] = useState([ApplyDetailDefault, ApplyDetailDefault]);
    const [showRejectionModal, setShowRejectionModal] = useState(false);

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const data = await getPostDetailAPI(postNo);
                const post = data.results.post;

                setForm({
                    ownerName: post.memberNo, // 사업자 이름
                    businessName: post.fcltyNm, // 업체 이름
                    contactNumber: post.telNo, // 전화번호
                    businessHours: post.operTime, // 운영시간
                    website: post.hmpgUrl, // 웹사이트
                    detailedClassification: post.ctgryThreeNm, // 상세 분류
                    businessType: post.ctgryTwoNm, // 카테고리
                    speciesRestriction: post.entrnPosblPetSizeValue, // 입장 가능 반려동물 크기
                    petSizeRestriction: post.petLmttMtrCn, // 반려동물 제한 사항
                    hasPetExclusiveSeats: post.inPlaceAcpPosblAt === 'Y', // 내부 장소 반려동물 동반 가능 여부
                    hasSpaceLimitations: post.outPlaceAcpPosblAt === 'Y', // 외부 장소 반려동물 동반 가능 여부
                    hasParking: post.parkngPosblAt === 'Y', // 주차공간
                    address: post.roadNm, // 주소
                    zipCode: post.zipNo, // 우편번호
                    detailAddress: '', // 상세 주소는 기본적으로 빈 값
                    statusExplanation: post.statusExplanation // 반려 사유는 기본적으로 빈 값
                });
            } catch (error) {
                console.error('Post detail fetch error:', error);
            }
        };

        fetchPostDetail();
    }, [postNo]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const navigate = useNavigate();

    const handleApprove = async () => {
        try {
            // 백엔드에 보낼 데이터 준비
            const postData = { status: 'APPROVED' };
            const response = await updatePostStatusAPI(postNo, postData);
            alert('업체가 승인되었습니다.');
            navigate(-1);
        } catch (error) {
            console.error('업체 승인 중 오류 발생:', error);
            alert('업체 승인에 실패했습니다.');
        }
    };


    const handleDelete = async () => {
        try {
            const response = await deletePostAwaitingListAPI(postNo);
            console.log("Delete 돼?:", response);


            alert("업체가 삭제되었습니다.");
            navigate('/member_list');

        } catch (error) {
            console.error('Error deleting post:', error);
            alert("업체 삭제에 실패했습니다.");
        }
    };

    const handleReject = () => {
        setShowRejectionModal(true);
    };

    const handleModalSubmit = async () => {
        try {
            const postData = { status: 'REJECTED', statusExplanation: form.statusExplanation };
            const response = await updatePostStatusAPI(postNo, postData);
            console.log("반려 사유 감싸짐?", response);
            alert('업체가 반려되었습니다.');
            setShowRejectionModal(false);
            console.log("이상한가?", setShowRejectionModal);
            navigate(-1);
        } catch (error) {
            console.error('업체 반려 중 오류 발생:', error);
            alert('업체 반려에 실패했습니다.');
        }
    };


    return (
        <div className="admin-business-body">
            <h1 className="admin-h1">업체 신청 정보</h1>
            <div className="admin-business-container">
                <div className="profile-section">
                    <div className="profile-pic-wrapper">
                        <img src={ApplyDetailDefault} className="profile-pic" />
                        <img src={ApplyDetailDefault2} className='profile-pic' />
                    </div>
                </div>

                <form onSubmit={handleApprove}>
                    <div className="apply-custom-layout">

                    </div>
                    <div className="apply-form-group">
                        <label htmlFor="businessName">업체 이름</label>
                        <input
                            type="text"
                            id="businessName"
                            name="businessName"
                            value={form.businessName}
                            onChange={handleChange}
                            placeholder="업체 이름 입력"
                            readOnly

                        />
                    </div>

                    <div className="apply-form-group">
                        <label htmlFor="contactNumber">전화번호</label>
                        <input
                            type="text"
                            id="contactNumber"
                            name="contactNumber"
                            value={form.contactNumber}
                            onChange={handleChange}
                            placeholder="전화번호 입력"
                            readOnly

                        />
                    </div>

                    <div className="apply-form-group">
                        <label htmlFor="businessHours">운영시간</label>
                        <input
                            type="text"
                            id="businessHours"
                            name="businessHours"
                            value={form.businessHours}
                            onChange={handleChange}
                            placeholder="운영 시간 입력"
                            readOnly

                        />
                    </div>

                    <div className="apply-form-group">
                        <label htmlFor="website">웹사이트</label>
                        <input
                            type="text"
                            id="website"
                            name="website"
                            value={form.website}
                            onChange={handleChange}
                            placeholder="웹사이트 입력"
                            readOnly

                        />
                    </div>

                    <div className="apply-form-group">
                        <label htmlFor="detailedClassification">상세 분류</label>
                        <input
                            type="text"
                            id="detailedClassification"
                            name="detailedClassification"
                            value={form.detailedClassification}
                            onChange={handleChange}
                            placeholder="상세 분류 입력"
                            readOnly

                        />
                    </div>

                    <div className="apply-form-group">
                        <label htmlFor="businessType">카테고리</label>
                        <input
                            type="text"
                            id="businessType"
                            name="businessType"
                            value={form.businessType}
                            onChange={handleChange}
                            placeholder="카테고리"
                            readOnly

                        />
                    </div>

                    <div className="apply-form-group">
                        <label htmlFor="speciesRestriction">입장 가능 반려동물 크기</label>
                        <input
                            type="text"
                            id="speciesRestriction"
                            name="speciesRestriction"
                            value={form.speciesRestriction}
                            onChange={handleChange}
                            placeholder="입장 가능 반려동물 크기"
                            readOnly
                        />
                    </div>

                    <div className="apply-form-group">
                        <label htmlFor="petSizeRestriction">반려동물 제한 사항</label>
                        <input
                            type="text"
                            id="petSizeRestriction"
                            name="petSizeRestriction"
                            value={form.petSizeRestriction}
                            onChange={handleChange}
                            placeholder="반려동물 제한 사항"
                            readOnly
                        />
                    </div>

                    <div className="apply-form-group">
                        <label htmlFor="hasPetExclusiveSeats">내부 장소 반려동물 동반 가능 여부</label>
                        <input
                            type="text"
                            id="hasPetExclusiveSeats"
                            name="hasPetExclusiveSeats"
                            value={form.hasPetExclusiveSeats ? 'Y' : 'N'} // Convert to 'Y' or 'N'
                            readOnly
                        />
                    </div>

                    <div className="apply-form-group">
                        <label htmlFor="hasSpaceLimitations">외부 장소 반려동물 동반 가능 여부</label>
                        <input
                            type="text"
                            id="hasSpaceLimitations"
                            name="hasSpaceLimitations"
                            value={form.hasSpaceLimitations ? 'Y' : 'N'} // Convert to 'Y' or 'N'
                            readOnly
                        />
                    </div>

                    <div className="apply-form-group">
                        <label htmlFor="hasParking">주차공간</label>
                        <input
                            type="text"
                            id="hasParking"
                            name="hasParking"
                            value={form.hasParking ? 'Y' : 'N'} // Convert to 'Y' or 'N'
                            readOnly
                        />
                    </div>

                    <div className="apply-form-group">
                        <label>주소</label>
                        <div className="address-group">
                            <input
                                type="text"
                                id="zipCode"
                                name="zipCode"
                                value={form.zipCode}
                                onChange={handleChange}
                                placeholder="우편번호"
                                readOnly

                            />
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                placeholder="주소 입력"
                                readOnly

                            />
                            <input
                                type="text"
                                id="detailAddress"
                                name="detailAddress"
                                value={form.detailAddress}
                                onChange={handleChange}
                                placeholder="상세 주소 입력"
                                readOnly

                            />
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="button" className="btn-approve" onClick={handleApprove}>승인</button>
                        <button type="button" className="btn-reject" onClick={handleReject}>반려</button>
                        <button type="button" className="btn-delete" onClick={handleDelete}>삭제</button>
                    </div>
                </form>
            </div>

            {showRejectionModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>반려 사유</h2>
                        <textarea
                            rows="4"
                            value={form.statusExplanation}
                            onChange={(e) => setForm({ ...form, statusExplanation: e.target.value })}
                        />
                        <div class="button-container">
                            <button onClick={() => setShowRejectionModal(false)}>취소</button>
                            <button onClick={handleModalSubmit}>확인</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ApplyDetail;
