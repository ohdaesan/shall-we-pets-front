import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { sendAuthEmail, checkAuthEmail, sendAuthPhone, checkAuthPhone } from '../../apis/VerificationAPI';
import '../../pages/member/FindId.css';
import { findIdByEmailAPI, findIdByPhoneAPI } from '../../apis/MemberAPICalls';

function FindIdForm() {
    const navigate = useNavigate();

    const [findBy, setFindBy] = useState('');
    const [phone, setPhone] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [name, setName] = useState('');
    const [verifyPhoneBtnClicked, setVerifyPhoneBtnClicked] = useState(false);
    const [authPhoneBtnClicked, setAuthPhoneBtnClicked] = useState(false);
    const [email, setEmail] = useState('');
    const [authCode2, setAuthCode2] = useState('');
    const [name2, setName2] = useState('');
    const [emailBtnClicked, setEmailBtnClicked] = useState(false);
    const [verifyEmailBtnClicked, setVerifyEmailBtnClicked] = useState(false);
    const [messageEmail, setMessageEmail] = useState('');
    const [messagePhone, setMessagePhone] = useState('');
    const [popupMemberId, setPopupMemberId] = useState('');
    const [popupOverlay, setPopupOverlay] = useState(false);
    const [keyEmail, setKeyEmail] = useState('');
    const [keyPhone, setKeyPhone] = useState('');
    const [isEmailInputDisabled, setIsEmailInputDisabled] = useState(false);
    const [isPhoneInputDisabled, setIsPhoneInputDisabled] = useState(false);

    useEffect(() => {
        updateNextBtnState();
    }, [name, phone, authCode, email, name2, authCode2, verifyPhoneBtnClicked, authPhoneBtnClicked, emailBtnClicked, verifyEmailBtnClicked, popupOverlay]);

    const toggleInputs = (type) => {
        setFindBy(type === 'phone' ? 'phone' : 'email');
    };

    const handlePhoneChange = (e) => {
        setAuthPhoneBtnClicked(false);
        setVerifyPhoneBtnClicked(false);
        setAuthCode('');

        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        if (value.length < 4) {
            setPhone(value);
        } else if (value.length < 8) {
            setPhone(`${value.slice(0, 3)}-${value.slice(3)}`);
        } else {
            setPhone(`${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`);
        }
    };

    const handleAuthCodeChange = (e) => setAuthCode(e.target.value.trim());

    const handleEmailChange = (e) => {
        setEmail(e.target.value.trim());
        setEmailBtnClicked(false);
        setVerifyEmailBtnClicked(false);
        setAuthCode2('');
    };

    const handleAuthCode2Change = (e) => {
        setAuthCode2(e.target.value.trim());
        setVerifyEmailBtnClicked(false);
    };

    const handleNameChange = (e) => setName(e.target.value.trim());

    const handleName2Change = (e) => setName2(e.target.value.trim());

    const handleVerifyPhone = () => {
        if (phone === '' || phone.length !== 13) {
            setMessagePhone("* 휴대전화 번호를 정확히 입력해 주세요.");
            setVerifyPhoneBtnClicked(false);
        } else {
            setMessagePhone('');
            
            handleSendPhoneAPI();
        }
    };

    const handleSendPhoneAPI = async () => {
        try {
            const response = await sendAuthPhone(phone);
            setKeyPhone(response);

            alert('인증 메세지가 전송되었습니다.');
            setAuthCode('');
            
            setVerifyPhoneBtnClicked(true);
        } catch (error) {
            alert('메세지 전송에 실패하였습니다.\n잠시후 다시 시도해주세요.');
            console.error('메세지 전송 실패: ', error);
        }
    };

    const verifyAuthPhone = async () => {
        try {
            const response = await checkAuthPhone(keyPhone, authCode, phone);
            
            if(response === true) {
                alert('인증번호가 확인되었습니다.');
                setIsPhoneInputDisabled(true);
                setAuthPhoneBtnClicked(true);
            } else {
                alert('인증번호가 다릅니다.');
            }
        } catch (error) {
            alert('인증번호 확인에 실패하였습니다.\n잠시후 다시 시도해주세요.');
            console.error('인증번호 확인 실패: ', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (findBy === 'email') {
                const response = await findIdByEmailAPI(findBy, name2, email);
                
                if(response.results.memberId) { // 아이디가 DB에 존재
                    setPopupMemberId(response.results.memberId);
                    setPopupOverlay(true);
                }
            } else if(findBy === 'phone') {
                const response = await findIdByPhoneAPI(findBy, name, phone);
                
                if(response.results.memberId) { // 아이디가 DB에 존재
                    setPopupMemberId(response.results.memberId);
                    setPopupOverlay(true);
                }
            }
        } catch (error) {   // 아이디가 DB에 존재하지 X
            alert('아이디를 찾을 수 없습니다.\n입력하신 정보를 다시 확인해주세요.');
            console.log('아이디 찾기 실패: ', error);
            setPopupMemberId('');
            setPopupOverlay(false);
        }
    };

    const updateNextBtnState = () => {
        let allFieldsFilled, allButtonsClicked;
        if (findBy === 'phone') {
            allFieldsFilled = name !== '' && phone !== '' && authCode !== '';
            allButtonsClicked = verifyPhoneBtnClicked && authPhoneBtnClicked;
        } else if (findBy === 'email') {
            allFieldsFilled = name2 !== '' && email !== '' && authCode2 !== '';
            allButtonsClicked = emailBtnClicked && verifyEmailBtnClicked;
        } else {
            allFieldsFilled = false;
            allButtonsClicked = false;
        }
        document.getElementById('find-id-nextBtn').disabled = !(allFieldsFilled && allButtonsClicked);
    };

    const handleSendAuthEmail = () => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            setMessageEmail("* 이메일 형식이 맞지 않습니다.");
        } else {
            setMessageEmail('');

            handleSendEmailAPI();
        }
    };

    const handleSendEmailAPI = async () => {
        try {
            const response = await sendAuthEmail(email);
            setKeyEmail(response);

            alert('이메일이 전송되었습니다.');
            setAuthCode2('');
            
            setEmailBtnClicked(true);
        } catch (error) {
            alert('이메일 전송에 실패하였습니다.\n잠시후 다시 시도해주세요.');
            console.error('이메일 전송 실패: ', error);
        }
    };

    const verifyAuthCode = async () => {
        try {
            const response = await checkAuthEmail(keyEmail, authCode2, email);
            
            if(response === true) {
                alert('인증번호가 확인되었습니다.');
                setVerifyEmailBtnClicked(true);
                setIsEmailInputDisabled(true);
            } else {
                alert('인증번호가 다릅니다.');
            }
        } catch (error) {
            alert('인증번호 확인에 실패하였습니다.\n잠시후 다시 시도해주세요.');
            console.error('인증번호 확인 실패: ', error);
        }
    };

    const confirmAndRedirect = () => {
        navigate("/member/login");
    };

    return (
        <div id="find-id-body">
            <main id="find-id-container">
                <h1>아이디 찾기</h1>
                <div id="find-id-div">
                    <form id="findIdForm" onSubmit={handleSubmit}>
                        <div className="find-id-input-group">
                            <input
                                type="radio"
                                className="searchBy"
                                name="searchBy"
                                id="findBy"
                                value="phone"
                                checked={findBy === 'phone'}
                                onChange={() => toggleInputs('phone')}
                            />
                            <label htmlFor="findBy" style={{fontWeight: "bolder"}}>회원정보에 등록된 휴대전화 인증</label>
                            <p>회원정보에 등록한 휴대전화 번호와 입력한 휴대전화 번호가 같아야 인증번호를 받을 수 있습니다.</p>
                        </div>

                        {findBy === 'phone' && (
                            <div id="phoneInputs">
                                <div className="find-id-input-group2">
                                    <label htmlFor="name">이름</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name1"
                                        placeholder="이름"
                                        value={name}
                                        onChange={handleNameChange}
                                    />
                                </div>

                                <div className="find-id-input-group2">
                                    <label htmlFor="phone">휴대전화</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        placeholder="번호만 입력"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        disabled={isPhoneInputDisabled}
                                    />
                                    <button
                                        type="button"
                                        id="verify-phone-btn"
                                        onClick={handleVerifyPhone}
                                        disabled={phone === '' || isPhoneInputDisabled}
                                    >
                                        인증번호 받기
                                    </button>
                                </div>

                                {messagePhone === '' && verifyPhoneBtnClicked && !isPhoneInputDisabled && (
                                    <div id="phoneAuthGroup" className="find-id-input-group2">
                                        <label htmlFor="authCode">인증번호</label>
                                        <input
                                            type="text"
                                            id="authCode"
                                            name="authCode"
                                            placeholder="인증번호 6자리 숫자 입력"
                                            value={authCode}
                                            onChange={handleAuthCodeChange}
                                        />
                                        <button
                                            type="button"
                                            id="auth-phone-btn"
                                            onClick={verifyAuthPhone}
                                            disabled={authCode === ''}
                                        >
                                            확인
                                        </button>
                                    </div>
                                )}

                                {messagePhone && (
                                    <p id="messagePhone" style={{ color: 'red' }}>{messagePhone}</p>
                                )}
                            </div>
                        )}

                        <div className="find-id-input-group" style={{ marginTop: "60px" }}>
                            <input
                                type="radio"
                                className="searchBy"
                                name="searchBy"
                                id="findByEmail"
                                value="email"
                                checked={findBy === 'email'}
                                onChange={() => toggleInputs('email')}
                            />
                            <label htmlFor="findByEmail" style={{fontWeight: "bolder"}}>본인확인 이메일로 인증</label>
                            <p>본인확인 이메일 주소로 인증번호를 받습니다.</p>
                        </div>

                        {findBy === 'email' && (
                            <div id="emailInputs">
                                <div className="find-id-input-group2">
                                    <label htmlFor="name2">이름</label>
                                    <input
                                        type="text"
                                        id="name2"
                                        name="name2"
                                        placeholder="이름"
                                        value={name2}
                                        onChange={handleName2Change}
                                    />
                                </div>

                                <div className="find-id-input-group2">
                                    <label htmlFor="email">이메일</label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder="이메일 입력"
                                        value={email}
                                        onChange={handleEmailChange}
                                        disabled={isEmailInputDisabled}
                                    />
                                    <button
                                        type="button"
                                        id="email-button"
                                        disabled={email === '' || isEmailInputDisabled}
                                        onClick={handleSendAuthEmail}
                                    >
                                        인증번호 받기
                                    </button>
                                </div>
                                <p id="messageEmail" style={{ color: 'red' }}>{messageEmail}</p>

                                {messageEmail === '' && emailBtnClicked && !isEmailInputDisabled && (
                                    <div id="emailAuthGroup" className="find-id-input-group2">
                                        <label htmlFor="authCode2">인증번호</label>
                                        <input
                                            type="text"
                                            id="authCode2"
                                            name="authCode2"
                                            placeholder="인증번호 6자리 숫자 입력"
                                            value={authCode2}
                                            onChange={handleAuthCode2Change}
                                        />
                                        <button
                                            type="button"
                                            id="verify-button"
                                            onClick={verifyAuthCode}
                                            disabled={authCode2 === ''}
                                        >
                                            확인
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        <button id="find-id-nextBtn" type="submit" disabled>
                            다음
                        </button>
                    </form>
                </div>

                {popupOverlay && (
                    <div id="popUpOverlay" className="pop-up-overlay">
                        <div className="pop-up-content">
                            <p>회원님의 아이디는 다음과 같습니다:</p>
                            <h2 id="popupMemberId">{popupMemberId}</h2>
                            <button onClick={confirmAndRedirect}>확인</button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default FindIdForm;