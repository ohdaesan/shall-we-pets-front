import React, { useState, useEffect } from 'react';
import './MyBusinessDetail.css';
import defaultProfilePic from '../../images/default_pfp.png'; // 기본 프로필 사진 경로
import $ from 'jquery';

function MyBusinessDetail() {
    const [form, setForm] = useState({
        facultyName: '',
        facultyCategory: '',
        facultyCategoryDetail: '',
        facultyPhone: '',
        facultyHomepage: '',
        facultyRestDay: '',
        facultyOpenTime: '',
        facultyParkable: '',
        facultyPriceChange: '',
        facultyPetExclusive: '',
        facultyPetLimit: '',
        facultyIndoor: '',
        facultyOutdoor: '',
        facultyInfo: '',
        facultyPetAddPrice: '',
        facultyAddress: '',
        facultyDetailAddress: '',
    });

    // 프로필 사진을 최대 10개까지 관리
    const [profilePics, setProfilePics] = useState([defaultProfilePic]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
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

    const handleProfilePicChange = (e) => {
        const files = Array.from(e.target.files);
        if (profilePics.length + files.length <= 10) {
            const newProfilePics = files.map((file) => URL.createObjectURL(file));
            setProfilePics([...profilePics, ...newProfilePics]);
        } else {
            alert("최대 10장까지 업로드 가능합니다.");
        }
    };

    const handleRemoveProfilePic = (index) => {
        setProfilePics(profilePics.filter((_, picIndex) => picIndex !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", form);
    };

    return (
        <div className="myinfo-body">
            <h1 className="myinfo-h1">내 업체 등록</h1>
            <div className="myinfo-container">
                <div className="profile-section">
                    {profilePics.map((pic, index) => (
                        <div key={index} className="profile-pic-container">
                            <img src={pic} alt={`Profile ${index + 1}`} className="profile-pic" />
                            <button type="button" className="remove-pic-btn" onClick={() => handleRemoveProfilePic(index)}>
                                삭제
                            </button>
                        </div>
                    ))}
                    {profilePics.length < 10 && (
                        <button className="profile-upload-btn">
                            프로필 사진 추가
                            <input type="file" accept="image/*" onChange={handleProfilePicChange} multiple />
                        </button>
                    )}
                </div>
                <hr />

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">업체이름</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="이름 입력"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="birthDate">카테고리 대분류</label>
                        <input
                            type="text"
                            id="birthDate"
                            name="birthDate"
                            value={form.birthDate}
                            onChange={handleChange}
                            placeholder="날짜 선택"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="id">카테고리 소분류</label>
                        <input
                            type="text"
                            id="id"
                            name="id"
                            maxLength="20"
                            value={form.id}
                            onChange={handleChange}
                            placeholder="아이디 입력 (20자 이내)"
                        />
                        <button type="button" className='btn'>중복확인</button>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">연락처</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            minLength="8"
                            maxLength="20"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="8자 이상 20자 이내로 입력"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nickname">홈페이지</label>
                        <input
                            type="text"
                            id="nickname"
                            name="nickname"
                            value={form.nickname}
                            onChange={handleChange}
                            placeholder="닉네임 입력"
                        />
                        <button type="button" className='btn'>중복확인</button>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">휴일</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="-없이 번호를 입력하세요"
                        />
                        <button type="button" className='btn'>인증하기</button>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">운영시간</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="-없이 번호를 입력하세요"
                        />
                        <button type="button" className='btn'>인증하기</button>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">주차공간</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="-없이 번호를 입력하세요"
                        />
                        <button type="button" className='btn'>인증하기</button>
                    </div>



                    <div className="form-group">
                        <label htmlFor="email">이용가격 변동</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="이메일 입력"
                        />
                        <button type="button" className='btn'>인증하기</button>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">반려동물 가능여부</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="이메일 입력"
                        />
                        <button type="button" className='btn'>인증하기</button>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">반려동물 제한 세부사항</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="이메일 입력"
                        />
                        <button type="button" className='btn'>인증하기</button>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">반려동물 전용</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="이메일 입력"
                        />
                        <button type="button" className='btn'>인증하기</button>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">이용가격 변동</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="이메일 입력"
                        />
                        <button type="button" className='btn'>인증하기</button>
                    </div>

                    <div className="form-group">
                        <label>주소</label>
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

                        <div className="form-actions">
                            <button type="button" className="btn-cancel">취소</button>
                            <button type="submit" className="btn-save">저장</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default MyBusinessDetail;
