// 업체 정보
// 업체 정보
import React, { useState, } from 'react';
// useEffect는 일단 임포트 하지 않음
import './BusinessDetail.css';
import ApplyDetailDefault from '../../../images/ApplyDetailDefault.png';

// import $ from 'jquery';


function BusinessDetail() {
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
        rejectionReason: '',
        detailedClassification: '',
        speciesRestriction: '',
        petSizeRestriction: '',
        hasPetExclusiveSeats: false,
        hasSpaceLimitations: false,
        hasParking: false
    });

    const [profilePics, setProfilePics] = useState([ApplyDetailDefault, ApplyDetailDefault]);
    const [showRejectionModal, setShowRejectionModal] = useState(false);

    const handleRemoveProfilePic = (index) => {
        setProfilePics(profilePics.filter((_, picIndex) => picIndex !== index));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleApprove = () => {
        console.log("업체 등록", form);
    };

    const handleDelete = () => {
        console.log("업체 삭제", form);
    };

    const handleReject = () => {
        setShowRejectionModal(true);
    };

    const categoryOptions = [
        "반려동물 서비스",
        "식당-카페",
        "동반여행",
        "문화시설",
        "애완병원"
    ];

    return (
        <div className="admin-business-body">
            <h1 className="admin-h1">업체 정보</h1>
            <div className="admin-business-container">
                <div className="profile-section">
                    {profilePics.map((pic, index) => (
                        <div key={index} className="profile-pic-wrapper">
                            <img src={pic} alt={`프로필 ${index + 1}`} className="profile-pic" />
                            <button
                                type="button"
                                className="remove-pic-btn"
                                onClick={() => handleRemoveProfilePic(index)}
                            >
                                &times; {/* X 표시를 나타내는 HTML 엔티티 */}
                            </button>
                        </div>
                    ))}

                </div>

                <form onSubmit={handleApprove}>
                    <div className="custom-layout">
                        <div className="form-group">
                            <label htmlFor="ownerName">사업자 이름</label>
                            <input
                                type="text"
                                id="ownerName"
                                name="ownerName"
                                value={form.ownerName}
                                onChange={handleChange}
                                placeholder="이름 입력"
                            />
                            <li><a href="/my_info">회원 정보 보기</a></li>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="businessName">업체 이름</label>
                        <input
                            type="text"
                            id="businessName"
                            name="businessName"
                            value={form.businessName}
                            onChange={handleChange}
                            placeholder="업체 이름 입력"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contactNumber">전화번호</label>
                        <input
                            type="text"
                            id="contactNumber"
                            name="contactNumber"
                            value={form.contactNumber}
                            onChange={handleChange}
                            placeholder="전화번호 입력"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="businessHours">운영시간</label>
                        <input
                            type="text"
                            id="businessHours"
                            name="businessHours"
                            value={form.businessHours}
                            onChange={handleChange}
                            placeholder="운영 시간 입력"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="website">웹사이트</label>
                        <input
                            type="text"
                            id="website"
                            name="website"
                            value={form.website}
                            onChange={handleChange}
                            placeholder="웹사이트 입력"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="detailedClassification">상세 분류</label>
                        <input
                            type="text"
                            id="detailedClassification"
                            name="detailedClassification"
                            value={form.detailedClassification}
                            onChange={handleChange}
                            placeholder="상세 분류 입력"
                        />
                    </div>



                    <div className="form-group">
                        <label htmlFor="businessType">카테고리</label>
                        <select
                            id="businessType"
                            name="businessType"
                            value={form.businessType}
                            onChange={handleChange}
                        >
                            <option value="">카테고리 선택</option>
                            {categoryOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="speciesRestriction">종 제한 여부</label>
                        <input
                            type="text"
                            id="speciesRestriction"
                            name="speciesRestriction"
                            value={form.speciesRestriction}
                            onChange={handleChange}
                            placeholder="종 제한 여부"

                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="petSizeRestriction">반려동물 사이즈 제한 여부</label>
                        <input
                            type="text"
                            id="petSizeRestriction"
                            name="petSizeRestriction"
                            value={form.petSizeRestriction}
                            onChange={handleChange}
                            placeholder="반려동물 사이즈 제한 여부"

                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="hasPetExclusiveSeats">반려동물 전용 의자</label>
                        <input
                            type="checkbox"
                            id="hasPetExclusiveSeats"
                            name="hasPetExclusiveSeats"
                            checked={form.hasPetExclusiveSeats}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="hasSpaceLimitations">공간 제한</label>
                        <input
                            type="checkbox"
                            id="hasSpaceLimitations"
                            name="hasSpaceLimitations"
                            checked={form.hasSpaceLimitations}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="hasParking">주차공간</label>
                        <input
                            type="checkbox"
                            id="hasParking"
                            name="hasParking"
                            checked={form.hasParking}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>주소</label>
                        <div className="address-group">
                            <input
                                type="text"
                                id="zipCode"
                                name="zipCode"
                                value={form.zipCode}
                                onChange={handleChange}
                                placeholder="우편번호"
                            />
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                placeholder="주소 입력"
                            />
                            <input
                                type="text"
                                id="detailAddress"
                                name="detailAddress"
                                value={form.detailAddress}
                                onChange={handleChange}
                                placeholder="상세 주소 입력"
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-approve" onClick={handleApprove}>등록</button>
                        <button type="button" className="btn-delete" onClick={handleDelete}>삭제</button>
                    </div>
                </form>
            </div>

            
        </div>

    );
}

export default BusinessDetail;

