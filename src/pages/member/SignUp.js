import React, { useState } from 'react';
import './SignUp.css';
import defaultProfilePic from '../../images/default_pfp.png'; // 기본 프로필 사진 경로

function SignUp() {
    const [form, setForm] = useState({
        id: '',
        password: '',
        nickname: '',
        name: '',
        birthDate: '',
        email: '',
        phone: '',
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
        <div className="signup-body">
            <h1 className="signup-h1">회원가입</h1>
            <div className="signup-container">
                <div className="profile-section">
                    <img src={profilePic} alt="Profile" className="profile-pic" />
                    <button className="profile-upload-btn">
                        프로필 사진 추가
                        <input type="file" accept="image/*" onChange={handleProfilePicChange} />
                    </button>
                </div><hr/>

                <form onSubmit={handleSubmit}>
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
                        <label>주소</label>
                        <div className="address-group">
                            <input
                                type="text"
                                id="zipcode"
                                name="zipcode"
                                value={form.zipcode}
                                onChange={handleChange}
                                placeholder="우편번호"
                            />
                            <button type="button" className='btn'>우편번호 찾기</button><br/>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                placeholder="도로명 주소"
                            />
                            <br/>
                            <input
                                type="text"
                                id='detailed-address'
                                name="detailed-address"
                                value={form.detailAddress}
                                onChange={handleChange}
                                placeholder="상세 주소"
                            />
                        </div>
                    </div>

                    <div className="bottom1">
                        <div className="terms-section">
                            <div>
                                <input id='terms-of-use-checkbox' type="checkbox"/>
                                <label htmlFor="terms-of-use-checkbox">&nbsp;이용 약관 동의</label>
                            </div>
                            <a href='/termsOfUse' target="_blank" style={{color: "gray"}}>보기</a>
                        </div>
                    </div>
                    <div className="bottom1">
                        <div className="terms-section">
                            <div>
                                <input id='privacy-policy-checkbox' type="checkbox"/>
                                <label htmlFor="privacy-policy-checkbox">&nbsp;개인정보 수집 이용 조회 동의</label>
                            </div>
                            <a href='/privacyPolicy' target="_blank" style={{color: "gray"}}>보기</a>
                        </div>
                    </div>
                    <div className="bottom2">
                        <button type="submit" className="submit-btn btn">가입하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
