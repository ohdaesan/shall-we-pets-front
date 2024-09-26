import React, { useState, useEffect } from 'react';
import './MyInfo.css';
import defaultProfilePic from '../../images/default_pfp.png';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function MyInfo() {
    const [form, setForm] = useState({
        memberName: '',
        memberDob: '',
        memberId: '',
        memberPwd: '',
        memberNickname: '',
        memberPhone: '',
        memberEmail: '',
        memberRoadAddress: '',
        memberDetailAddress: '',
        zipcode: '',
    });

    const [profilePic, setProfilePic] = useState(defaultProfilePic);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get('/mypage/my_info');
            setForm(response.data);
            if (response.data.image && response.data.image.imageUrl) {
                setProfilePic(response.data.image.imageUrl);
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
            const maxSize = 10 * 1024 * 1024; // 10MB

            if (!validFormats.includes(file.type)) {
                alert('지원되지 않는 파일 형식입니다. JPEG, PNG, GIF, JPG 형식의 이미지만 업로드할 수 있습니다.');
                return;
            }

            if (file.size > maxSize) {
                alert('파일 크기가 10MB를 초과할 수 없습니다.');
                return;
            }
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        if (profilePic !== defaultProfilePic) {
            setProfilePic(defaultProfilePic);
        } else {
            document.getElementById('profilePicInput').click();
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleDateChange = (date) => {
        setForm({
            ...form,
            memberDob: date
        });
    };

    const checkDuplicate = async (field) => {
        try {
            const response = await axios.get(`/mypage/check_${field}`, { params: { [field]: form[field] } });
            setErrors({
                ...errors,
                [field]: response.data
            });
        } catch (error) {
            console.error(`Error checking ${field} duplication:`, error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/mypage/my_info', form);
            if (profilePic !== defaultProfilePic) {
                const formData = new FormData();
                formData.append('file', dataURItoBlob(profilePic));
                await axios.post('/mypage/profile_picture', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            alert('회원 정보가 성공적으로 업데이트되었습니다.');
        } catch (error) {
            console.error('Error updating user info:', error);
            alert('회원 정보 업데이트 중 오류가 발생했습니다.');
        }
    };

    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    const findZipCode = () => {
        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            new window.daum.Postcode({
            oncomplete: function(data) {
                setForm({
                    ...form,
                    roadAddress: data.address,
                    zipcode: data.zonecode
                });
            }
            }).open();
        };

        return () => {
            document.body.removeChild(script);
        };
    }

    return (
        <div className="myinfo-body">
            <h1 className="myinfo-h1">회원 정보</h1>
            <div className="myinfo-container">
                <div className="profilepic-title">프로필 사진</div>
                <div className="profile-section">
                    <div className="image-item" onClick={handleImageClick}>
                        <img src={profilePic} alt="Profile" className="profile-pic" />
                    </div>
                    <input
                        id="profilePicInput"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                    />
                </div>
                <hr />

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="memberName">이름</label>
                        <input
                            type="text"
                            id="memberName"
                            name="memberName"
                            value={form.memberName}
                            onChange={handleChange}
                            placeholder="이름 입력"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="memberDob">생년월일</label>
                        <DatePicker
                            selected={form.memberDob ? new Date(form.memberDob) : null}
                            onChange={handleDateChange}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="날짜 선택"
                            maxDate={new Date()}
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="memberId">아이디</label>
                        <input
                            type="text"
                            id="memberId"
                            name="memberId"
                            maxLength="20"
                            value={form.memberId}
                            onChange={handleChange}
                            placeholder="아이디 입력 (20자 이내)"
                        />
                        <button type="button" className='btn' onClick={() => checkDuplicate('id')}>중복확인</button>
                        {errors.id && <span className="error">{errors.id}</span>}
                    </div>

                    <div className="form-group password-group">
                        <label htmlFor="memberPwd">비밀번호</label>
                        <div className="button-wrapper">
                            <a href="/mypage/changepassword" className='btn btn-change-password'>비밀번호 변경</a>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="memberNickname">닉네임</label>
                        <input
                            type="text"
                            id="memberNickname"
                            name="memberNickname"
                            value={form.memberNickname}
                            onChange={handleChange}
                            placeholder="닉네임 입력"
                        />
                        <button type="button" className='btn' onClick={() => checkDuplicate('nickname')}>중복확인</button>
                        {errors.nickname && <span className="error">{errors.nickname}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="memberPhone">휴대전화</label>
                        <input
                            type="tel"
                            id="memberPhone"
                            name="memberPhone"
                            value={form.memberPhone}
                            onChange={handleChange}
                            placeholder="-없이 번호를 입력하세요"
                        />
                        <button type="button" className='btn' onClick={() => checkDuplicate('phone')}>중복확인</button>
                        {errors.phone && <span className="error">{errors.phone}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="memberEmail">이메일</label>
                        <input
                            type="email"
                            id="memberEmail"
                            name="memberEmail"
                            value={form.memberEmail}
                            onChange={handleChange}
                            placeholder="이메일 입력"
                        />
                        <button type="button" className='btn' onClick={() => checkDuplicate('email')}>중복확인</button>
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    
                    <div className="form-group">
                        <label>주소</label>
                        <div className="signup-address-group">
                            <div className="signup-zipcode-container">
                                <input
                                    type="text"
                                    id="zipcode"
                                    name="zipcode"
                                    value={form.zipcode}
                                    onChange={handleChange}
                                    placeholder="우편번호"
                                    disabled
                                />
                                <button type="button" id='zipcode-btn' onClick={findZipCode}>우편번호 찾기</button>
                            </div>
                            <input
                                type="text"
                                id="roadAddress"
                                name="roadAddress"
                                value={form.roadAddress}
                                onChange={handleChange}
                                placeholder="도로명 주소"
                                disabled
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
                        <button type="button" className="btn-cancel" onClick={() => window.location.reload()}>취소</button>
                        <button type="submit" className="btn-submit">제출</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MyInfo;