import React, { useState, useEffect, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import '../../pages/member/SignUp.css';
import { useNavigate } from 'react-router-dom';
import defaultProfilePic from '../../images/default_pfp.png'; // 기본 프로필 사진 경로
import $, { now } from 'jquery';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';
import 'bootstrap-datepicker';
import { checkMemberId, checkMemberNickname, checkUser, registerAPI } from '../../apis/MemberAPICalls';
import { checkAuthEmail, sendAuthEmail, checkAuthPhone, sendAuthPhone } from '../../apis/VerificationAPI';
import { uploadS3Image } from '../../apis/ImagesAPICalls';

function SignUpForm() {
    const fileInputRef = useRef(null);
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);

    const [file, setFile] = useState(null);
    const [profilePic, setProfilePic] = useState(defaultProfilePic);
    const [imgSrc, setImgSrc] = useState('');
    const [crop, setCrop] = useState({ unit: '%', width: 50, aspect: 1, x: 25, y: 25, height: 50 });
    const [completedCrop, setCompletedCrop] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [imageOrigName, setImageOrigName] = useState('');
    const [tempImgName, setTempImgName] = useState('');

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
        imageNo: null
    });

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
        }).on('changeDate', function(e) {
            setForm(prevForm => ({ ...prevForm, birthDate: e.format() }));
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

    // 프로필 사진 변경
    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();

            setTempImgName(e.target.files[0].name);

            reader.onload = () => {
                setImgSrc(reader.result);
                setShowModal(true);
                setCrop({ unit: '%', width: 50, aspect: 1, x: 25, y: 25, height: 50 });
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onImageLoad = () => {
        setCrop({ unit: '%', width: 50, aspect: 1, x: 25, y: 25, height: 50 });
    };

    const onCropComplete = (crop) => {
        setCompletedCrop(crop);
    };

    // 프로필 사진 크롭
    const generateCroppedImage = () => {
        const image = imgRef.current;
        const canvas = previewCanvasRef.current;

        if (!image || !canvas || !completedCrop) {
            console.error('이미지 로딩 오류');
            return;
        }

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        const ctx = canvas.getContext('2d');
        canvas.width = completedCrop.width;
        canvas.height = completedCrop.height;

        ctx.drawImage(
            image,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            completedCrop.width,
            completedCrop.height
        );

        canvas.toBlob((blob) => {
            if (!blob) {
                console.error('Blob 생성 오류');
                return;
            }

            const file = new File([blob], tempImgName || 'cropped-image.png', {
                type: 'image/jpg',
                lastModified: Date.now(),
            });

            setFile(file);
    
            const url = URL.createObjectURL(blob);
            
            setProfilePic(url);
            setShowModal(false);
            setImageOrigName(tempImgName);
        }, 'image/png');
    };

    const handleResetProfilePic = () => {
        setProfilePic(defaultProfilePic);
        setImgSrc('');
        setCompletedCrop(null);
        setImageOrigName('');
        setTempImgName('');
    };

    const closeModal = () => {
        setShowModal(false);
    }

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
            // Check the auth code against the fixed value
            if (authCodeEmail === '111111') {
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
            const response = await checkAuthPhone(keyPhone, authCodePhone, form.phone);
            
            if(response === true) {
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
                const responseUser = await checkUser(form.email, form.phone);

                if (responseUser.results.emailExists === false && responseUser.results.phoneExists === false) {
                    // 업로드할 프로필 사진이 있는 경우
                    if (profilePic !== defaultProfilePic) {
                        const responseProfilePic = await uploadProfilePic();

                        if (responseProfilePic) {
                            await register(responseProfilePic);
                        } else {
                            alert('프로필 사진 서버 업로드에 실패하였습니다.');
                        }
                    } else {
                        // 회원가입
                        await register(null);
                    }
                } else if (responseUser.results.emailExists === true || responseUser.results.phoneExists === true){
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

    const uploadProfilePic = async () => {
        try {
            const response = await uploadS3Image(file);
            
            if (response.results) {
                setForm({
                    ...form,
                    imageNo: response.results
                });

                return response.results;
            } else {
                alert('프로필 사진 서버 업로드에 실패하였습니다.');
                return null;
            }
        } catch (error) {
            alert('프로필 사진 서버 업로드에 실패하였습니다.');
            console.error('프로필 사진 서버 업로드 실패: ', error);
            return null;
        }
    }

    const register = async (imageNo) => {
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
                imageNo
            );

            if(response.httpStatusCode === 201) {
                alert('회원가입 완료!');
                navigate('/member/login');
            }
        } catch (error) {
            alert('회원 등록에 실패하였습니다.\n잠시후 다시 시도해주세요.');
            console.error('회원 등록 실패: ', error);
        }
    };

    return (
        <div className="signup-body">
            <h1 className="signup-h1">회원가입</h1>
            <div className="signup-container">
                <div className="signup-profile-section">
                    <img src={profilePic} alt="Profile" className="signup-profile-pic"/>

                    <div className='signup-profile-upload-section'>
                        {imageOrigName}
                        <button className="signup-profile-upload-btn" onClick={() => fileInputRef.current.click()}>
                            프로필 사진 변경
                            <input type="file" accept="image/*" onChange={onSelectFile} style={{ display: 'none' }} ref={fileInputRef} />
                        </button>
                    </div>

                    {profilePic && profilePic !== defaultProfilePic && (
                        <button className="signup-profile-upload-btn" onClick={handleResetProfilePic} style={{marginLeft: '5px'}}>
                            초기화
                        </button>
                    )}
                    
                    {showModal && (
                        <div id="popUpOverlay" className="pop-up-overlay">
                            <div className="pop-up-content">
                                <h4>선택한 이미지 자르기</h4>

                                {!!imgSrc && (
                                    <ReactCrop
                                        src={imgSrc}
                                        crop={crop}
                                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                                        onComplete={onCropComplete}
                                        aspect={1}
                                        ruleOfThirds
                                    >
                                        <img
                                        ref={imgRef}
                                        alt="Cropped image"
                                        src={imgSrc}
                                        onLoad={onImageLoad}
                                        style={{ maxWidth: '100%', maxHeight: '400px' }}
                                        />
                                    </ReactCrop>
                                )}

                                <canvas ref={previewCanvasRef} style={{ display: 'none' }} />

                                <button onClick={generateCroppedImage} className="apply-btn">
                                    등록
                                </button>

                                <button onClick={closeModal} className="close-btn">
                                    닫기
                                </button>
                            </div>
                        </div>
                    )}

                </div><hr/>

                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="signup-form-group">
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
                            <button type="button" className='signup-btn' disabled={idBtnDisabled || isIdChecked} onClick={onClickCheckId}>중복확인</button>
                        </div>

                        {idWarningMessage && <div className='signup-warning-message' style={idWarningMessageStyle}>{idWarningMessage}</div>}
                    </div>
                    
                    <div>
                        <div className="signup-form-group">
                            <label htmlFor="password">비밀번호</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                // minLength="8"
                                maxLength="20"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="8자 이상 20자 이내로 입력"
                            />
                        </div>
                        {pwdWarningMessage && <div className='signup-warning-message' style={pwdWarningMessageStyle}>{pwdWarningMessage}</div>}
                    </div>

                    <div>
                        <div className="signup-form-group">
                            <label htmlFor="nickname">닉네임</label>
                            <input
                                type="text"
                                id="nickname"
                                name="nickname"
                                value={form.nickname}
                                onChange={handleChange}
                                placeholder="닉네임 입력"
                            />
                            <button type="button" className='signup-btn' disabled={nicknameBtnDisabled || isNicknameChecked} onClick={onClickCheckNickname}>중복확인</button>
                        </div>
                        {nicknameWarningMessage && <div className='signup-warning-message' style={nicknameWarningMessageStyle}>{nicknameWarningMessage}</div>}
                    </div>

                    <div className="signup-form-group">
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

                    <div className="signup-form-group">
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
                        <div className="signup-form-group">
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
                            <button type="button" className='signup-btn' disabled={emailBtnDisabled} onClick={handleSendAuthEmail}>인증하기</button>
                        </div>
                        {emailWarningMessage && <div className='signup-warning-message' style={emailWarningMessageStyle}>{emailWarningMessage}</div>}
                    </div>

                    {emailWarningMessage === '' && emailBtnClicked && !isEmailInputDisabled && (
                        <div className="signup-form-group">
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
                                className='signup-btn'
                                type="button"
                                onClick={verifyEmailAuthCode}
                                disabled={authCodeEmail === '' || verifyEmailBtnClicked}
                                style={{fontWeight: "bolder"}}
                            >
                                확인
                            </button>
                        </div>
                    )}

                    <div className="signup-form-group">
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
                        <button type="button" className='signup-btn' disabled={phoneBtnDisabled} onClick={handleSendAuthPhone}>인증하기</button>
                    </div>

                    {form.phone !== '' && phoneBtnClicked && !isPhoneInputDisabled && (
                        <div className="signup-form-group">
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
                                className='signup-btn'
                                type="button"
                                onClick={verifyPhoneAuthCode}
                                disabled={authCodePhone === '' || verifyPhoneBtnClicked}
                                style={{fontWeight: "bolder"}}
                            >
                                확인
                            </button>
                        </div>
                    )}

                    <div className="signup-form-group">
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

                    <div className="bottom1">
                        <div className="terms-section">
                            <div>
                                <input id='terms-of-use-checkbox' type="checkbox" checked={termsAccepted} onChange={() => handleCheckboxChange('terms')}/>
                                <label htmlFor="terms-of-use-checkbox">&nbsp;이용 약관 동의</label>
                            </div>
                            <a href='/termsOfUse' target="_blank" style={{color: "gray"}}>보기</a>
                        </div>
                    </div>
                    <div className="bottom1">
                        <div className="terms-section">
                            <div>
                                <input id='privacy-policy-checkbox' type="checkbox" checked={privacyAccepted} onChange={() => handleCheckboxChange('privacy')}/>
                                <label htmlFor="privacy-policy-checkbox">&nbsp;개인정보 수집 이용 조회 동의</label>
                            </div>
                            <a href='/privacyPolicy' target="_blank" style={{color: "gray"}}>보기</a>
                        </div>
                    </div>
                    <div className="bottom2">
                        <button type="submit" className="signup-submit-btn" disabled={!isSubmitEnabled}>가입하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUpForm;