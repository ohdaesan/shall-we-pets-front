import './MyInfo.css';
import React, { useState, useEffect } from 'react';
import '../../pages/member/SignUp.css';
import { useNavigate } from 'react-router-dom';
import defaultProfilePic from '../../images/default_pfp.png';
import $, { now } from 'jquery';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';
import 'bootstrap-datepicker';
import { checkMemberId, checkMemberNickname, checkUser, registerAPI } from '../../apis/MemberAPICalls';
import { checkAuthEmail, sendAuthEmail, checkAuthPhone, sendAuthPhone } from '../../apis/VerificationAPI';

const MyInfo = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        id: '',
        password: '',
        nickname: '',
        name: '',
        birthDate: '',
        email: '',
        phone: '',
        zipcode: '',
        roadAddress: '',
        detailAddress: '',
    });

    const [profilePic, setProfilePic] = useState(defaultProfilePic);

    const [idWarningMessage, setIdWarningMessage] = useState('');
    const [idWarningMessageStyle, setIdWarningMessageStyle] = useState({ color: 'red' });

    const [pwdWarningMessage, setPwdWarningMessage] = useState('');
    const [pwdWarningMessageStyle, setPwdWarningMessageStyle] = useState({ color: 'red' });

    const [emailWarningMessage, setEmailWarningMessage] = useState('');
    const [emailWarningMessageStyle, setEmailWarningMessageStyle] = useState({ color: 'red' });

    const [nicknameWarningMessage, setNicknameWarningMessage] = useState('');
    const [nicknameWarningMessageStyle, setNicknameWarningMessageStyle] = useState({ color: 'red' });

    const [isIdChecked, setIsIdChecked] = useState(false);
    const [isNicknameChecked, setIsNicknameChecked] = useState(false);

    const [keyEmail, setKeyEmail] = useState('');
    const [keyPhone, setKeyPhone] = useState('');

    const [authCodeEmail, setAuthCodeEmail] = useState('');
    const [emailBtnClicked, setEmailBtnClicked] = useState(false);
    const [isEmailBtnClicked, setIsEmailBtnClicked] = useState(false);
    const [verifyEmailBtnClicked, setVerifyEmailBtnClicked] = useState(false);

    const [authCodePhone, setAuthCodePhone] = useState('');
    const [phoneBtnClicked, setPhoneBtnClicked] = useState(false);
    const [verifyPhoneBtnClicked, setVerifyPhoneBtnClicked] = useState(false);
    const [isPhoneBtnClicked, setIsPhoneBtnClicked] = useState(false);

    const isIdEmpty = form.id.trim() === '';
    const isNicknameEmpty = form.nickname.trim() === '';
    const isEmailEmpty = form.email.trim() === '';
    const isPhoneEmpty = form.phone.trim() === '';

    const idBtnDisabled = isIdEmpty;
    const nicknameBtnDisabled = isNicknameEmpty;
    const emailBtnDisabled = isEmailEmpty || isEmailBtnClicked;
    const phoneBtnDisabled = isPhoneEmpty || isPhoneBtnClicked;

    const [isEmailInputDisabled, setIsEmailInputDisabled] = useState(false);
    const [isPhoneInputDisabled, setIsPhoneInputDisabled] = useState(false);

    const [termsAccepted, setTermsAccepted] = useState(false);
    const [privacyAccepted, setPrivacyAccepted] = useState(false);

    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

    const updateSubmitBtnState = () => {
        setIsSubmitEnabled(
            form.id.trim() !== '' &&
            form.nickname.trim() !== '' &&
            form.email.trim() !== '' &&
            form.phone.trim() !== '' &&
            form.name.trim() !== '' &&
            form.birthDate !== '' &&
            form.zipcode.trim() !== '' &&
            form.roadAddress.trim() !== '' &&
            form.password.trim() !== '' &&
            isIdChecked &&
            isNicknameChecked &&
            isEmailBtnClicked &&
            verifyEmailBtnClicked &&
            isPhoneBtnClicked &&
            verifyPhoneBtnClicked &&
            termsAccepted &&
            privacyAccepted
        );
    };

    useEffect(() => {
        updateSubmitBtnState();
    }, [form, isIdChecked, isNicknameChecked, isEmailBtnClicked, verifyEmailBtnClicked, isPhoneBtnClicked, termsAccepted, privacyAccepted]);

    useEffect(() => {
        const today = getTodaysDate();

        $('#birthDate').datepicker({
            format: "yyyy-mm-dd",
            autoclose: true,
            todayHighlight: true,
            startDate: '1900-01-01',
            endDate: today,
            defaultViewDate: { year: 2000, month: 0 }
        }).on('changeDate', function (e) {
            setForm(prevForm => ({ ...prevForm, birthDate: e.format() }));
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

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        // id를 변경하면 다시 disable button
        if (e.target.name === 'id') {
            setIsIdChecked(false);
            setIdWarningMessage('');
        }

        if (e.target.name === 'password') {
            setPwdWarningMessage('');
        }

        if (e.target.name === 'nickname') {
            setIsNicknameChecked(false);
            setNicknameWarningMessage('');
        }

        if (e.target.name === 'email') {
            setEmailBtnClicked(false);
            setIsEmailBtnClicked(false);
            setAuthCodeEmail('');
            setVerifyEmailBtnClicked(false);
        }

        if (e.target.name === 'authCodeEmail') {
            setAuthCodeEmail(e.target.value.trim());
            setVerifyEmailBtnClicked(false);
        }

        if (e.target.name === 'phone') {
            let value = e.target.value.replace(/[^0-9]/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            if (value.length < 4) {
                setForm({
                    ...form,
                    [e.target.name]: value
                });
            } else if (value.length < 8) {
                setForm({
                    ...form,
                    [e.target.name]: `${value.slice(0, 3)}-${value.slice(3)}`
                });
            } else {
                setForm({
                    ...form,
                    [e.target.name]: `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`
                });
            }

            setIsPhoneBtnClicked(false);
            setAuthCodePhone('');
            setVerifyPhoneBtnClicked(false);
            setPhoneBtnClicked(false);
        }

        if (e.target.name === 'authCodePhone') {
            setAuthCodePhone(e.target.value.trim());
            setVerifyPhoneBtnClicked(false);
        }
    };

    const handleCheckboxChange = (type) => {
        if (type === 'terms') {
            setTermsAccepted(prev => !prev);
        } else if (type === 'privacy') {
            setPrivacyAccepted(prev => !prev);
        }
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(URL.createObjectURL(file));
        }
    };

    const onClickCheckId = async () => {
        try {
            const response = await checkMemberId(form.id);

            if (response.results.exists === true) {  // 아이디 중복
                setIdWarningMessage('* 이미 사용중인 아이디입니다.');
                setIdWarningMessageStyle({ color: 'red' });
                setIsIdChecked(false);
            } else {
                setIdWarningMessage('사용 가능한 아이디입니다.');
                setIdWarningMessageStyle({ color: 'green' });
                setIsIdChecked(true);
            }
        } catch (error) {
            console.error('아이디 중복 확인 실패: ', error);
        }
    };

    const onClickCheckNickname = async () => {
        try {
            const response = await checkMemberNickname(form.nickname);

            if (response.results.exists === true) {
                setNicknameWarningMessage('* 이미 사용중인 닉네임입니다.');
                setNicknameWarningMessageStyle({ color: 'red' });
                setIsNicknameChecked(false);
            } else {
                setNicknameWarningMessage('사용 가능한 닉네임입니다.');
                setNicknameWarningMessageStyle({ color: 'green' });
                setIsNicknameChecked(true);
            }
        } catch (error) {
            console.error('닉네임 중복 확인 실패: ', error);
        }
    };

    const handleSendAuthEmail = () => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(form.email)) {
            setEmailWarningMessage("* 이메일 형식이 맞지 않습니다.");
        } else {
            setEmailWarningMessage('');
            setIsEmailBtnClicked(true);
            handleSendEmailAPI();
        }
    };

    const handleSendEmailAPI = async () => {
        try {
            const response = await sendAuthEmail(form.email);
            setKeyEmail(response);
            alert('이메일이 전송되었습니다.');
            setAuthCodeEmail('');
            setEmailBtnClicked(true);
        } catch (error) {
            alert('이메일 전송에 실패하였습니다.\n잠시후 다시 시도해주세요.');
            console.error('이메일 전송 실패: ', error);
        }
    };

    const handleSendAuthPhone = () => {
        setIsPhoneBtnClicked(true);
        handleSendPhoneAPI();
    };

    // TODO: 휴대폰 인증
    const handleSendPhoneAPI = async () => {
        try {
            const response = await sendAuthPhone(form.phone);
            setKeyPhone(response);

            alert('인증번호가 입력하신 번호로 전송되었습니다.');
            setAuthCodePhone('');

            setPhoneBtnClicked(true);
        } catch (error) {
            alert('인증번호 전송에 실패하였습니다.\n잠시후 다시 시도해주세요.');
            console.error('인증번호 전송 실패: ', error);
        }
    };

    const handleAuthCodeEmailChange = (e) => {
        setAuthCodeEmail(e.target.value.trim());
        setVerifyEmailBtnClicked(false);
    };

    const handleAuthCodePhoneChange = (e) => {
        setAuthCodePhone(e.target.value.trim());
        setVerifyPhoneBtnClicked(false);
    };

    const verifyEmailAuthCode = async () => {
        try {
            const response = await checkAuthEmail(keyEmail, authCodeEmail, form.email);

            if (response === true) {
                alert('인증번호가 확인되었습니다.');
                setVerifyEmailBtnClicked(true);
                setIsEmailInputDisabled(true);
            } else {
                alert('인증번호가 다릅니다.');
                setVerifyEmailBtnClicked(false);
            }
        } catch (error) {
            alert('인증번호 확인에 실패하였습니다.\n잠시후 다시 시도해주세요.');
            console.error('인증번호 확인 실패: ', error);
        }
    };

    const verifyPhoneAuthCode = async () => {
        try {
            const response = await checkAuthPhone(keyPhone, authCodeEmail, form.email);

            if (response === true) {
                alert('인증번호가 확인되었습니다.');
                setVerifyPhoneBtnClicked(true);
                setIsPhoneInputDisabled(true);
            } else {
                alert('인증번호가 다릅니다.');
                setVerifyPhoneBtnClicked(false);
            }
        } catch (error) {
            alert('인증번호 확인에 실패하였습니다.\n잠시후 다시 시도해주세요.');
            console.error('인증번호 확인 실패: ', error);
        }
    };

    // 우편번호 찾기
    const findZipCode = () => {
        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            new window.daum.Postcode({
                oncomplete: function (data) {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 비밀번호 regex 검사
        const regexPw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!regexPw.test(form.password)) {
            setPwdWarningMessage("* 비밀번호는 최소 8자 이상이어야 하며, 적어도 하나의 문자, 숫자 및 특수 문자를 포함해야 합니다.");
        } else {
            setPwdWarningMessage('');

            // 이미 존재하는 회원인지 확인
            try {
                const response = await checkUser(form.email, form.phone);

                if (response.results.emailExists === false && response.results.phoneExists === false) {
                    // 회원가입
                    register();
                } else if (response.results.emailExists === true || response.results.phoneExists === true) {
                    // 이미 존재하는 회원
                    alert('이미 가입한 사용자입니다.');
                    navigate('/member/login');
                }
            } catch (error) {
                alert('멤버 확인에 실패하였습니다.\n잠시후 다시 시도해주세요.');
                console.error('멤버 확인 실패: ', error);
            }
        }
    };

    const register = async () => {
        try {
            const currentDate = new Date(Date.now()).toISOString().slice(0, 19);
            const response = await registerAPI(
                form.id,
                form.password,
                form.nickname,
                form.name,
                form.email,
                form.phone,
                form.birthDate,
                form.zipcode,
                form.roadAddress,
                form.detailAddress,
                currentDate,
                null
            );

            if (response.httpStatusCode === 201) {
                alert('회원가입 완료!');
                navigate('/member/login');
            }
        } catch (error) {
            alert('회원 등록에 실패하였습니다.\n잠시후 다시 시도해주세요.');
            console.error('회원 등록 실패: ', error);
        }
    };

    const handleSaveData = () => {
        if (window.confirm("회원 정보를 수정하시겠습니까?")) {
            // 수정할 데이터 저장 로직을 여기에 추가하세요
            // 예: API 호출 등을 통해 데이터 저장

            // 회원정보 수정 완료 메시지
            alert("회원정보 수정이 완료되었습니다.");
            window.location.href = '/mypage/my_info'; // 확인 후 리다이렉트
        } else {
            // 정보 수정 취소 메시지
            alert("정보 수정이 취소되었습니다.");
        }
    };

    const handleCancel = () => {
        window.location.href = 'http://localhost:3000'; // localhost:3000으로 리다이렉트
    };

    return (
        <div className="myinfo-body">
            <h1 className="myinfo-h1">회원정보 수정</h1>
            <div className="myinfo-container">
                <div className="myinfo-profile-section">
                    <img src={profilePic} alt="Profile" className="myinfo-profile-pic" />

                    <input type="file" accept="image/*" onChange={handleProfilePicChange} />
                </div><hr />

                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="myinfo-form-group">
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
                            <button type="button" className='myinfo-btn' disabled={idBtnDisabled || isIdChecked} onClick={onClickCheckId}>중복확인</button>
                        </div>

                        {idWarningMessage && <div className='myinfo-warning-message' style={idWarningMessageStyle}>{idWarningMessage}</div>}
                    </div>

                    <div className="myinfo-form-group">
                        <label htmlFor="password">비밀번호</label>
                        <button type="button" className='myinfo-btn' a href="/mypage/changepassword">비밀번호 변경</button>
                    </div>


                    <div>
                        <div className="myinfo-form-group">
                            <label htmlFor="nickname">닉네임</label>
                            <input
                                type="text"
                                id="nickname"
                                name="nickname"
                                value={form.nickname}
                                onChange={handleChange}
                                placeholder="닉네임 입력"
                            />
                            <button type="button" className='myinfo-btn' disabled={nicknameBtnDisabled || isNicknameChecked} onClick={onClickCheckNickname}>중복확인</button>
                        </div>
                        {nicknameWarningMessage && <div className='myinfo-warning-message' style={nicknameWarningMessageStyle}>{nicknameWarningMessage}</div>}
                    </div>

                    <div className="myinfo-form-group">
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

                    <div className="myinfo-form-group">
                        <label htmlFor="birthDate">생년월일</label>
                        <input
                            type="text"
                            id="birthDate"
                            name="birthDate"
                            value={form.birthDate}
                            onChange={handleChange}
                            readOnly
                            placeholder="날짜 선택"
                        />
                    </div>

                    <div>
                        <div className="myinfo-form-group">
                            <label htmlFor="email">이메일</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="이메일 입력"
                                disabled={isEmailInputDisabled}
                            />
                            <button type="button" className='myinfo-btn' disabled={emailBtnDisabled} onClick={handleSendAuthEmail}>인증하기</button>
                        </div>
                        {emailWarningMessage && <div className='myinfo-warning-message' style={emailWarningMessageStyle}>{emailWarningMessage}</div>}
                    </div>

                    {emailWarningMessage === '' && emailBtnClicked && !isEmailInputDisabled && (
                        <div className="myinfo-form-group">
                            <label htmlFor="authCodeEmail">이메일 인증번호</label>
                            <input
                                type="text"
                                id="authCodeEmail"
                                name="authCodeEmail"
                                placeholder="인증번호 6자리 숫자 입력"
                                disabled={isEmailInputDisabled}
                                value={authCodeEmail}
                                onChange={handleAuthCodeEmailChange}
                            />
                            <button
                                className='myinfo-btn'
                                type="button"
                                onClick={verifyEmailAuthCode}
                                disabled={authCodeEmail === '' || verifyEmailBtnClicked}
                                style={{ fontWeight: "bolder" }}
                            >
                                확인
                            </button>
                        </div>
                    )}

                    <div className="myinfo-form-group">
                        <label htmlFor="phone">휴대전화</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="-없이 번호만 입력하세요"
                            disabled={isPhoneInputDisabled}
                        />
                        <button type="button" className='myinfo-btn' disabled={phoneBtnDisabled} onClick={handleSendAuthPhone}>인증하기</button>
                    </div>

                    {form.phone !== '' && phoneBtnClicked && !isPhoneInputDisabled && (
                        <div className="myinfo-form-group">
                            <label htmlFor="authCodePhone">휴대전화 인증번호</label>
                            <input
                                type="text"
                                id="authCodePhone"
                                name="authCodePhone"
                                placeholder="인증번호 6자리 숫자 입력"
                                disabled={isPhoneInputDisabled}
                                value={authCodePhone}
                                onChange={handleAuthCodePhoneChange}
                            />
                            <button
                                className='myinfo-btn'
                                type="button"
                                onClick={verifyPhoneAuthCode}
                                disabled={authCodePhone === '' || verifyPhoneBtnClicked}
                                style={{ fontWeight: "bolder" }}
                            >
                                확인
                            </button>
                        </div>
                    )}

                    <div className="myinfo-form-group">
                        <label>주소</label>
                        <div className="myinfo-address-group">
                            <div className="myinfo-zipcode-container">
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
                    <div className="myinfo-buttons-container">
                        <button type="button" className="myinfo-btn-cancel" onClick={handleCancel}>취소</button>
                        <button type="submit" className="myinfo-btn-submit" onClick={handleSaveData}>제출</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MyInfo;