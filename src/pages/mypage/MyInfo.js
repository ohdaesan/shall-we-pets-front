import React, { useState } from 'react';
import './MyInfo.css';
import defaultProfilePic from '../../images/default_pfp.png'; 
import { useEffect } from 'react';
import $ from 'jquery';

function MyInfo() {
    const [form, setForm] = useState({
        name: '',
        birthDate: '',
        id: '',
        password: '',
        nickname: '',
        phone: '',
        email: '',
        zipcode: '',
        address: '',
        detailAddress: '',
    });

    const [profilePic, setProfilePic] = useState(defaultProfilePic);

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
        }).on('show', function(e) {
            setTimeout(function() {
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
        const file = e.target.files[0];
        if (file) {
            setProfilePic(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", form);
    };

    return (
        <div className="myinfo-body">
            <h1 className="myinfo-h1">회원 정보</h1>
            <div className="myinfo-container">
                <div className="profile-section">
                    <img src={profilePic} alt="Profile" className="profile-pic" />
                    <button className="profile-upload-btn">
                        프로필 사진 추가
                        <input type="file" accept="image/*" onChange={handleProfilePicChange} />
                    </button>
                </div>
                <hr />

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">이름</label>
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
                        <label htmlFor="birthDate">생년월일</label>
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
                        <label htmlFor="id">아이디</label>
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
                        <label htmlFor="password">비밀번호</label>
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
                        <label htmlFor="nickname">닉네임</label>
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
                        <label htmlFor="phone">휴대전화</label>
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
                        <label htmlFor="email">이메일</label>
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

export default MyInfo;