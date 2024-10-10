import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ApplyDetail.css';
import ApplyDetailDefault from '../../../images/reviewpic4.jpg';
import { getPostDetailAPI } from '../../../apis/PostAPICalls';
import { deletePostAwaitingListAPI, updatePostStatusAPI } from '../../../apis/PostRegisterAPICalls';
import { getPostImageByPostNoAPI } from '../../../apis/ImagesAPICalls';

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
    const [businessImages, setBusinessImages] = useState({});

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const data = await getPostDetailAPI(postNo);
                const post = data.results.post;
                const imageData = await getPostImageByPostNoAPI(postNo, 4);

                if (imageData.httpStatusCode === 200 && imageData.results.postImageList.length > 0) {
                    setBusinessImages(prevImages => ({
                        ...prevImages,
                        [postNo]: imageData.results.postImageList[0].imageUrl
                    }));
                } else {
                    setBusinessImages(prevImages => ({
                        ...prevImages,
                        [postNo]: ApplyDetailDefault
                    }));
                }

                setForm({
                    ownerName: post.memberNo,
                    businessName: post.fcltyNm,
                    contactNumber: post.telNo,
                    businessHours: post.operTime,
                    website: post.hmpgUrl,
                    detailedClassification: post.ctgryThreeNm,
                    businessType: post.ctgryTwoNm,
                    speciesRestriction: post.entrnPosblPetSizeValue,
                    petSizeRestriction: post.petLmttMtrCn,
                    hasPetExclusiveSeats: post.inPlaceAcpPosblAt === 'Y',
                    hasSpaceLimitations: post.outPlaceAcpPosblAt === 'Y',
                    hasParking: post.parkngPosblAt === 'Y',
                    address: post.roadNm,
                    zipCode: post.zipNo,
                    detailAddress: '',
                    statusExplanation: post.statusExplanation || ''
                });
            } catch (error) {
                console.error('Error fetching post details:', error);
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
            const postData = { status: 'APPROVED' };
            await updatePostStatusAPI(postNo, postData);
            alert('업체가 승인되었습니다.');
            navigate(-1);
        } catch (error) {
            console.error('Error approving post:', error);
            alert('업체 승인에 실패했습니다.');
        }
    };

    const handleDelete = async () => {
        try {
            await deletePostAwaitingListAPI(postNo);
            alert('업체가 삭제되었습니다.');
            navigate('/member_list');
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('업체 삭제에 실패했습니다.');
        }
    };

    const handleReject = () => {
        setShowRejectionModal(true);
    };

    const handleModalSubmit = async () => {
        try {
            const postData = { status: 'REJECTED', statusExplanation: form.statusExplanation };
            await updatePostStatusAPI(postNo, postData);
            alert('업체가 반려되었습니다.');
            setShowRejectionModal(false);
            navigate(-1);
        } catch (error) {
            console.error('Error rejecting post:', error);
            alert('업체 반려에 실패했습니다.');
        }
    };

    return (
        <div className="admin-business-body">
            <h1 className="admin-h1">업체 신청 정보</h1>
            <div className="admin-business-container">
                <div className="profile-section">
                    <div className="profile-pic-wrapper">
                        <img src={businessImages[postNo] || ApplyDetailDefault} className="profile-pic" alt="Business" />
                    </div>
                </div>

                <form>
                    <div className="apply-form-group">
                        <label htmlFor="businessName">업체 이름</label>
                        <input type="text" id="businessName" name="businessName" value={form.businessName} readOnly />
                    </div>

                    <div className="apply-form-group">
                        <label htmlFor="contactNumber">전화번호</label>
                        <input type="text" id="contactNumber" name="contactNumber" value={form.contactNumber} readOnly />
                    </div>

                    <div className="apply-form-group">
                        <label htmlFor="businessHours">운영시간</label>
                        <input type="text" id="businessHours" name="businessHours" value={form.businessHours} readOnly />
                    </div>

                    <div className="apply-form-group">
                        <label htmlFor="website">웹사이트</label>
                        <input type="text" id="website" name="website" value={form.website} readOnly />
                    </div>

                    <div className="apply-form-group">
                        <label htmlFor="detailedClassification">상세 분류</label>
                        <input type="text" id="detailedClassification" name="detailedClassification" value={form.detailedClassification} readOnly />
                    </div>

                    <div className="apply-form-group">
                        <label htmlFor="businessType">카테고리</label>
                        <input type="text" id="businessType" name="businessType" value={form.businessType} readOnly />
                    </div>

                    <div className="apply-form-group">
                        <label htmlFor="speciesRestriction">입장 가능 반려동물 크기</label>
                        <input type="text" id="speciesRestriction" name="speciesRestriction" value={form.speciesRestriction} readOnly />
                    </div>

                    <div className="apply-form-group">
                        <label htmlFor="petSizeRestriction">반려동물 제한 사항</label>
                        <input type="text" id="petSizeRestriction" name="petSizeRestriction" value={form.petSizeRestriction} readOnly />
                    </div>

                    <div className="apply-form-group">
                        <label htmlFor="hasPetExclusiveSeats">내부 장소 반려동물 동반 가능 여부</label>
                        <input type="text" id="hasPetExclusiveSeats" name="hasPetExclusiveSeats" value={form.hasPetExclusiveSeats ? 'Y' : 'N'} readOnly />
                    </div>

                    <div className="apply-form-group">
                        <label htmlFor="hasSpaceLimitations">외부 장소 반려동물 동반 가능 여부</label>
                        <input type="text" id="hasSpaceLimitations" name="hasSpaceLimitations" value={form.hasSpaceLimitations ? 'Y' : 'N'} readOnly />
                    </div>

                    <div className="apply-form-group">
                        <label htmlFor="hasParking">주차공간</label>
                        <input type="text" id="hasParking" name="hasParking" value={form.hasParking ? 'Y' : 'N'} readOnly />
                    </div>

                    <div className="apply-form-group">
                        <label>주소</label>
                        <div className="address-group">
                            <input type="text" id="zipCode" name="zipCode" value={form.zipCode} readOnly />
                            <input type="text" id="address" name="address" value={form.address} readOnly />
                            <input type="text" id="detailAddress" name="detailAddress" value={form.detailAddress} readOnly />
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
                            name="statusExplanation"
                            value={form.statusExplanation}
                            onChange={handleChange}
                            rows="5"
                        />
                        <div className="modal-actions">
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
