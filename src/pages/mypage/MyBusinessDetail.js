import React, { useState, useEffect } from 'react';
import './MyBusinessDetail.css';
import $ from 'jquery';
import businessProfilePic from '../../images/187803-200.png';

function MyBusinessdetail() {
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
        hasParking: false,
    });

    const categoryOptions = [
        "반려동물 서비스",
        "식당-카페",
        "동반여행",
        "문화시설",
        "애완병원"
    ];

    const [profilePics, setProfilePics] = useState([]);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        if (files.length + profilePics.length > 10) {
            return;
        }

        const newImages = files.map(file => URL.createObjectURL(file));
        setProfilePics(prevPics => [...prevPics, ...newImages].slice(0, 10));
    };

    const removeImage = (index) => {
        setProfilePics(prevPics => prevPics.filter((_, i) => i !== index));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    useEffect(() => {
        const today = getTodaysDate();

        $('#birthDate').datepicker({
            format: "yyyy-mm-dd",
            autoclose: true,
            todayHighlight: true,
            startDate: '1900-01-01',
            endDate: today,
            defaultViewDate: { year: 2000, month: 0 }
        }).on('show', function (e) {
            setTimeout(function () {
                $('.datepicker').css({
                    'position': 'absolute',
                    'top': $('#birthDate').offset().top + $('#birthDate').outerHeight(),
                    'left': $('#birthDate').offset().left
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", { ...form, profilePics });
    };

    return (
        <div className="mybusinessdetail-body">
            <h1 className="mybusinessdetail-h1">업체 등록</h1>
            <div className="mybusinessdetail-container">
                <div className="profile-section">
                    <div className="image-grid">
                        {profilePics.map((pic, index) => (
                            <div key={index} className="image-item" onClick={() => removeImage(index)}>
                                <img src={pic} alt={`Profile ${index + 1}`} className="profile-pic" />
                            </div>
                        ))}
                        {profilePics.length < 10 && (
                            <label className="profile-pic-label">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    multiple
                                    style={{ display: 'none' }}
                                />
                                <div className="add-image-button">
                                    <img src={businessProfilePic} alt="Add" className="add-image-icon" />
                                </div>
                            </label>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="custom-layout">
                        <div className="form-group">
                            <label htmlFor="ownerName" className="businessinfo-label">사업자 이름</label>
                            <input
                                type="text"
                                id="ownerName"
                                name="ownerName"
                                value={form.ownerName}
                                onChange={handleChange}
                                placeholder="이름 입력"
                            />
                        </div>
                        <div><a href="mypage/my_info">회원 정보 보기</a></div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="businessName" className="businessinfo-label">업체 이름</label>
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
                        <label htmlFor="contactNumber" className="businessinfo-label">전화번호</label>
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
                        <label htmlFor="businessHours" className="businessinfo-label">운영시간</label>
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
                        <label htmlFor="website" className="businessinfo-label">웹사이트</label>
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
                        <label htmlFor="detailedClassification" className="businessinfo-label">상세 분류</label>
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
                        <label htmlFor="businessType" className="businessinfo-label">카테고리</label>
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
                        <label htmlFor="speciesRestriction" className="businessinfo-label">종 제한 여부</label>
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
                        <label htmlFor="petSizeRestriction" className="businessinfo-label">반려동물 사이즈 제한 여부</label>
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
                        <label htmlFor="hasPetExclusiveSeats" className="businessinfo-label">반려동물 전용 의자</label>
                        <input
                            type="checkbox"
                            id="hasPetExclusiveSeats"
                            name="hasPetExclusiveSeats"
                            checked={form.hasPetExclusiveSeats}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="hasSpaceLimitations" className="businessinfo-label">공간 제한</label>
                        <input
                            type="checkbox"
                            id="hasSpaceLimitations"
                            name="hasSpaceLimitations"
                            checked={form.hasSpaceLimitations}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="hasParking" className="businessinfo-label">주차공간</label>
                        <input
                            type="checkbox"
                            id="hasParking"
                            name="hasParking"
                            checked={form.hasParking}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="businessinfo-label">주소</label>
                        <div className="address-group">
                            <div className="zipcode-container">
                                <input
                                    type="text"
                                    id="zipcode"
                                    name="zipcode"
                                    value={form.zipcode}
                                    onChange={handleChange}
                                    placeholder="우편번호"
                                />
                                <button type="button" className='btn'>우편번호 찾기</button>
                            </div>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                placeholder="도로명 주소"
                            />
                            <input
                                type="text"
                                id='detailed-address'
                                name="detailAddress"
                                value={form.detailAddress}
                                onChange={handleChange}
                                placeholder="상세 주소"
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-cancel">취소</button>
                        <button type="submit" className="btn-save">저장</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MyBusinessdetail;