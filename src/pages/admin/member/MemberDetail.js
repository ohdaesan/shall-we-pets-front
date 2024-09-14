import "./MemberDetail.css"
import Logo from "../../../images/shallwepets_logo.png"
import defaultProfilePic from '../../../images/default_pfp.png'
import { useEffect } from 'react';
import $ from 'jquery';
import React, { useState } from 'react';
import businessLogo from "../../../images/shallwepets_business_pic.png"
import businessLogo1 from "../../../images/shallwepets_business_pic1.png"

// 회원정보페이지
function MemberDetail() {

    const [form, setForm] = useState({
        name: '',
        birthDate: '',
        id: '',
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
        console.log("Form Submitted:", form);
    };


    return (
        // 왼쪽 navbar
        <div className="member-info-navbar">
            <h1 className="member-info-page">회원정보 페이지</h1>

            <div className="member-info-navbar1">
                <br /><a href="" className="member-info-navbar1-info">회원 정보</a><br /><br />
                <a href="" className="member-info-navbar1-review">회원 리뷰</a><br /><br />
                <a href="" className="member-info-navbar1-point">포인트 내역</a><br />
                <img className="member-detail-logo" src={Logo} />
            </div>


            {/* 회원정보 */}
            <div className="myinfo-body">
                <h1 className="myinfo-h1">회원 정보</h1>
                <div className="myinfo-container">
                    <div className="profile-section">
                        <img src={profilePic} alt="Profile" className="profile-pic" />
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
                                placeholder="홍길동"
                                disabled
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
                                placeholder="2000-01-01"
                                disabled
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
                                placeholder="ShallWePets"
                                disabled
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
                                placeholder="Pet1004"
                                disabled
                            />

                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">휴대전화</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="010-5645-8976"
                                disabled
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
                                placeholder="shallwepets@gmail.com"
                                disabled
                            />

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
                                        placeholder="10223"
                                        disabled
                                    />

                                </div>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    placeholder="강원특별자치도 평창군 진부면 동산리"
                                    disabled
                                />
                                <input
                                    type="text"
                                    id='detailed-address'
                                    name="detailAddress"
                                    value={form.detailAddress}
                                    onChange={handleChange}
                                    placeholder="강원특별자치도 평창군 진부면 동산리"
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn-cancel">삭제</button>
                        </div>
                    </form>

                </div>
            </div>

            {/* 회원이 등록한 업체 */}
            <h1 className="member-regist-business">회원이 등록한 업체</h1>
            <div className="member-regist-business-navbar">
                        
                
                        <div>
                        
                            <a href="" className="member-regist-business-pic1"><img className="member-regist-business-pic" src={businessLogo}/></a>
                            <a href="" className="member-regist-business-name">쉘위펫즈</a><br/>
                            <a href="" className="member-regist-business-address">강원도 평창군 평창읍 백오로 123</a>
                            <p className="member-regist-business-ok">승인</p>
                            
                        </div>
                    
                        <div className="member-regist-business-line"></div>

                        <div>
                        
                            <a href="" className="member-regist-business-pic3"><img className="member-regist-business-pic2" src={businessLogo1}/></a>
                            <a href="" className="member-regist-business-name1">쉘위펫즈 서울지점</a><br/>
                            <a href="" className="member-regist-business-address1">서울시 서초구 사임당로 33</a>
                            <p className="member-regist-business-ok1">미승인</p>
                            
                        </div>

                    </div>

        </div>





    )
}

export default MemberDetail;