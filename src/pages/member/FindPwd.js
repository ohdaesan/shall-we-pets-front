import React, { useState, useEffect } from 'react';
import './FindPwd.css';

function FindPwd() {
    const [findByPhoneNum, setFindByPhoneNum] = useState(null);
    const [phone, setPhone] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [name, setName] = useState('');
    const [verifyPhoneBtnClicked, setVerifyPhoneBtnClicked] = useState(false);
    const [authPhoneBtnClicked, setAuthPhoneBtnClicked] = useState(false);
    const [email, setEmail] = useState('');
    const [authCode2, setAuthCode2] = useState('');
    const [name2, setName2] = useState('');
    const [id1, setId1] = useState('');
    const [id2, setId2] = useState('');
    const [emailBtnClicked, setEmailBtnClicked] = useState(false);
    const [verifyBtnClicked, setVerifyBtnClicked] = useState(false);
    const [messageEmail, setMessageEmail] = useState('');
    const [messagePhone, setMessagePhone] = useState('');
    const [popupMessage, setPopupMessage] = useState('');
    const [popupOverlay, setPopupOverlay] = useState(true);

    useEffect(() => {
        updateNextBtnState();
    }, [findByPhoneNum, name, phone, authCode, email, name2, authCode2, id1, id2, verifyPhoneBtnClicked, authPhoneBtnClicked, emailBtnClicked, verifyBtnClicked]);

    const toggleInputs = (type) => {
        setFindByPhoneNum(type === 'phone' ? 'phone' : 'email');
        // Reset button clicked states when switching
        if (type === 'phone') {
            setEmailBtnClicked(false);
            setVerifyBtnClicked(false);
            setMessageEmail('');
        } else {
            setVerifyPhoneBtnClicked(false);
            setAuthPhoneBtnClicked(false);
            setMessagePhone('');
        }
    };

    const handlePhoneChange = (e) => {
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

    const handleEmailChange = (e) => setEmail(e.target.value.trim());

    const handleAuthCode2Change = (e) => setAuthCode2(e.target.value.trim());

    const handleNameChange = (e) => setName(e.target.value.trim());

    const handleName2Change = (e) => setName2(e.target.value.trim());

    const handleVerifyPhone = () => {
        setVerifyPhoneBtnClicked(true);
        if (phone === '' || phone.length !== 13) {
            setMessagePhone("* 휴대전화 번호를 정확히 입력해 주세요.");
        } else {
            setMessagePhone('');
        }
    };

    const handleAuthPhone = () => {
        setAuthPhoneBtnClicked(true);
    };

    const handleEmailButton = () => {
        setEmailBtnClicked(true);
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            setMessageEmail("* 이메일 형식이 맞지 않습니다.");
        } else {
            setMessageEmail('');
        }
    };

    const handleVerifyButton = () => {
        setVerifyBtnClicked(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        fetch('/member/findPw', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setPopupMessage("비밀번호 재설정 링크가 이메일로 전송되었습니다.");
                setPopupOverlay(true);
            } else if (data.error) {
                alert(data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const updateNextBtnState = () => {
        let allFieldsFilled, allButtonsClicked;
        if (findByPhoneNum === 'phone') {
            allFieldsFilled = id1 !== '' && name !== '' && phone !== '' && authCode !== '';
            allButtonsClicked = verifyPhoneBtnClicked && authPhoneBtnClicked;
        } else if (findByPhoneNum === 'email') {
            allFieldsFilled = id2 !== '' && name2 !== '' && email !== '' && authCode2 !== '';
            allButtonsClicked = emailBtnClicked && verifyBtnClicked;
        } else {
            allFieldsFilled = false;
            allButtonsClicked = false;
        }
        document.getElementById('nextBtn').disabled = !(allFieldsFilled && allButtonsClicked);
    };

    const confirmAndRedirect = () => {
        window.location.href = '/login';
    };

    return (
        <div id="find-pw-body">
            <main id="find-pw-container">
                <h1>비밀번호 찾기</h1>
                <div id="find-pw-div">
                    <form id="findPwForm" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="radio"
                                className="searchBy"
                                name="searchBy"
                                id="findByPhoneNum"
                                value="phone"
                                checked={findByPhoneNum === 'phone'}
                                onChange={() => toggleInputs('phone')}
                            />
                            <label htmlFor="findByPhoneNum" style={{fontWeight: "bolder"}}>회원정보에 등록된 휴대전화 인증</label>
                            <p>회원정보에 등록한 휴대전화 번호와 입력한 휴대전화 번호가 같아야 인증번호를 받을 수 있습니다.</p>
                        </div>

                        {findByPhoneNum === 'phone' && (
                            <div id="phoneInputs">
                                <div className="input-group2">
                                    <label htmlFor="id1" style={{fontWeight: "bolder"}}>아이디</label>
                                    <input
                                        type="text"
                                        id="id1"
                                        name="id1"
                                        placeholder="아이디"
                                        value={id1}
                                        onChange={e => setId1(e.target.value.trim())}
                                    />
                                </div>

                                <div className="input-group2">
                                    <label htmlFor="name" style={{fontWeight: "bolder"}}>이름</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="이름"
                                        value={name}
                                        onChange={handleNameChange}
                                    />
                                </div>

                                <div className="input-group2">
                                    <label htmlFor="phone" style={{fontWeight: "bolder"}}>휴대전화</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        placeholder="휴대전화 번호 입력"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                    />
                                    <button
                                        type="button"
                                        id="verify-phone-btn"
                                        onClick={handleVerifyPhone}
                                        disabled={phone === ''}
                                        style={{fontWeight: "bolder"}}
                                    >
                                        인증번호 받기
                                    </button>
                                </div>

                                {messagePhone === '' && verifyPhoneBtnClicked && (
                                    <div id="phoneAuthGroup" className="input-group2">
                                        <label htmlFor="authCode" style={{fontWeight: "bolder"}}>인증번호</label>
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
                                            onClick={handleAuthPhone}
                                            disabled={authCode === ''}
                                            style={{fontWeight: "bolder"}}
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

                        <div className="input-group" style={{ marginTop: "60px" }}>
                            <input
                                type="radio"
                                className="searchBy"
                                name="searchBy"
                                id="findByEmail"
                                value="email"
                                checked={findByPhoneNum === 'email'}
                                onChange={() => toggleInputs('email')}
                            />
                            <label htmlFor="findByEmail" style={{fontWeight: "bolder"}}>본인확인 이메일로 인증</label>
                            <p>본인확인 이메일 주소로 인증번호를 받습니다.</p>
                        </div>

                        {findByPhoneNum === 'email' && (
                            <div id="emailInputs">
                                <div className="input-group2">
                                    <label htmlFor="id2" style={{fontWeight: "bolder"}}>아이디</label>
                                    <input
                                        type="text"
                                        id="id2"
                                        name="id2"
                                        placeholder="아이디"
                                        value={id2}
                                        onChange={e => setId2(e.target.value.trim())}
                                    />
                                </div>

                                <div className="input-group2">
                                    <label htmlFor="name2" style={{fontWeight: "bolder"}}>이름</label>
                                    <input
                                        type="text"
                                        id="name2"
                                        name="name2"
                                        placeholder="이름"
                                        value={name2}
                                        onChange={handleName2Change}
                                    />
                                </div>

                                <div className="input-group2">
                                    <label htmlFor="email" style={{fontWeight: "bolder"}}>이메일</label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder="이메일 입력"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                    <button
                                        type="button"
                                        id="email-button"
                                        onClick={handleEmailButton}
                                        disabled={email === ''}
                                        style={{fontWeight: "bolder"}}
                                    >
                                        인증번호 받기
                                    </button>
                                </div>
                                <p id="messageEmail" style={{ color: 'red' }}>{messageEmail}</p>

                                {messageEmail === '' && emailBtnClicked && (
                                    <div id="emailAuthGroup" className="input-group2">
                                        <label htmlFor="authCode2" style={{fontWeight: "bolder"}}>인증번호</label>
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
                                            onClick={handleVerifyButton}
                                            disabled={authCode2 === ''}
                                            style={{fontWeight: "bolder"}}
                                        >
                                            확인
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        <button id="nextBtn" type="submit" disabled style={{fontWeight: "bolder"}}>
                            다음
                        </button>
                    </form>
                </div>

                {popupOverlay && (
                    <div id="popupOverlay" className="popup-overlay">
                        <div className="popup-content">
                            <p>{popupMessage}</p>
                            <button onClick={confirmAndRedirect}>확인</button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default FindPwd;
