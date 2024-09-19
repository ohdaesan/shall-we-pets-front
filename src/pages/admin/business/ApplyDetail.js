import React, { useState, useEffect } from 'react';
import './ApplyDetail.css';
import ApplyDetailDefault from 'C:/Users/80418/Downloads/admin.businessDetail/src/images/ApplyDetailDefault.png';
import $ from 'jquery';

function ApplyDetail() {
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

    useEffect(() => {
        const today = getTodaysDate();

        $('#businessStartDate').datepicker({
            format: "yyyy-mm-dd",
            autoclose: true,
            todayHighlight: true,
            startDate: '1900-01-01',
            endDate: today,
            defaultViewDate: { year: 2023, month: 0 }
        }).on('show', function (e) {
            setTimeout(function () {
                $('.datepicker').css({
                    'position': 'absolute',
                    'top': $('#businessStartDate').offset().top + $('#businessStartDate').outerHeight(),
                    'left': $('#businessStartDate').offset().left
                });
            }, 100);
        });
    }, []);

    const getTodaysDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // const handleProfilePicChange = (e) => {
    //     const files = Array.from(e.target.files);
    //     if (profilePics.length + files.length <= 10) {
    //         const newProfilePics = files.map((file) => URL.createObjectURL(file));
    //         setProfilePics([...profilePics, ...newProfilePics]);
    //     } else {
    //         alert("최대 10장까지 업로드 가능합니다.");
    //     }
    // };

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
        console.log("업체 승인", form);
    };

    const handleDelete = () => {
        console.log("업체 삭제", form);
    };

    const handleReject = () => {
        setShowRejectionModal(true);
    };

    const handleModalSubmit = () => {
        console.log("반려 사유:", form.rejectionReason);
        setShowRejectionModal(false);
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
            <h1 className="admin-h1">업체 신청 정보</h1>
            <div className="admin-business-container">
                <div className="profile-section">
                    {profilePics.map((pic, index) => (
                        <div key={index} className="profile-pic-container">
                            <img src={pic} alt={`프로필 ${index + 1}`} className="profile-pic" />
                            <button type="button" className="remove-pic-btn" onClick={() => handleRemoveProfilePic(index)}>
                                삭제
                            </button>
                        </div>
                    ))}
                    {/* {profilePics.length < 10 && (
                        <button className="profile-upload-btn">
                            업체 사진 추가
                            <input type="file" accept="image/*" onChange={handleProfilePicChange} multiple />
                        </button>
                    )} */}
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
                        <label htmlFor="speciesRestriction">종 제한</label>
                        <input
                            type="checkbox"
                            id="speciesRestriction"
                            name="speciesRestriction"
                            value={form.speciesRestriction}
                            onChange={handleChange}

                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="petSizeRestriction">반려동물 사이즈 제한</label>
                        <input
                            type="checkbox"
                            id="petSizeRestriction"
                            name="petSizeRestriction"
                            value={form.petSizeRestriction}
                            onChange={handleChange}

                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="hasPetExclusiveSeats">반려동물 전용 의자 여부</label>
                        <input
                            type="checkbox"
                            id="hasPetExclusiveSeats"
                            name="hasPetExclusiveSeats"
                            checked={form.hasPetExclusiveSeats}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="hasSpaceLimitations">공간 제한 여부</label>
                        <input
                            type="checkbox"
                            id="hasSpaceLimitations"
                            name="hasSpaceLimitations"
                            checked={form.hasSpaceLimitations}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="hasParking">주차공간 여부</label>
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
                        <button type="button" className="btn-approve" onClick={handleApprove}>승인</button>
                        <button type="button" className="btn-reject" onClick={handleReject}>반려</button>
                        <button type="button" className="btn-delete" onClick={handleDelete}>삭제</button>
                    </div>
                </form>
            </div>

            {showRejectionModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>반려 사유 입력</h2>
                        <textarea
                            name="rejectionReason"
                            value={form.rejectionReason}
                            onChange={handleChange}
                            placeholder="반려 사유를 입력하세요"
                        />
                        <button type="button" onClick={handleModalSubmit}>제출</button>
                        <button type="button" onClick={() => setShowRejectionModal(false)}>닫기</button>
                    </div>
                </div>
            )}
        </div>

    );
}

export default ApplyDetail;

