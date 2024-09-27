import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import securityAd1 from '../../images/securityad1.png';
import securityAd2 from '../../images/securityad2.png';
import { changePwdNotLoggedInAPI } from '../../apis/MemberAPICalls';

function ChangePwdNotLoggedInForm() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        newPassword: '',
        confirmNewPassword: '',
    });

    const [popupMsg, setPopupMsg] = useState('');
    const [popupOverlay, setPopupOverlay] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const memberId = localStorage.getItem('memberId');

        try {
            if (memberId !== null) {
                const response = await changePwdNotLoggedInAPI(memberId, form.newPassword, form.confirmNewPassword);
                console.log("response: ", response);
                if (response.results?.success) {
                    localStorage.removeItem("memberId");
                    setWarningMessage('');

                    // 비밀번호 변경 시 팝업창 띄우기
                    setPopupOverlay(true);
                    setPopupMsg('비밀번호 변경 성공!');
                } else {
                    if (response.data.results && response.data.results.error) {
                        setWarningMessage(response.data.results.error);
                    } else {
                        setWarningMessage('비밀번호를 다시 확인해주세요.');
                    }
                }
            }
        } catch (error) {
            console.log('error: ', error);
        }
    };

    // 취소 버튼에 대한 처리
    const cancelAndRedirect = () => {
        localStorage.removeItem("memberId");
        navigate("/member/login");
    };

    const confirmAndRedirect = () => {
        localStorage.removeItem("memberId");
        navigate("/member/login");
    };

    return (
        <div className="changePwdNotLoggedIn-body">
            <h1 className="changePwdNotLoggedIn-h1">비밀번호 변경</h1>
            <div className="changePwdNotLoggedIn-container">
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className="changePwdNotLoggedIn-form-fields">
                        <div className="changePwdNotLoggedIn-form-group">
                            <label htmlFor="newPassword">새 비밀번호</label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                // minLength="8"
                                maxLength="20"
                                value={form.newPassword}
                                onChange={handleChange}
                                placeholder="8자 이상 20자 이내로 입력"
                            />
                        </div>

                        <div className="changePwdNotLoggedIn-form-group">
                            <label htmlFor="confirmNewPassword">새 비밀번호 확인</label>
                            <input
                                type="password"
                                id="confirmNewPassword"
                                name="confirmNewPassword"
                                // minLength="8"
                                maxLength="20"
                                value={form.confirmNewPassword}
                                onChange={handleChange}
                                placeholder="8자 이상 20자 이내로 입력"
                            />
                        </div>

                        {warningMessage && <div className='warning-message'>{warningMessage}</div>}
                    </div>

                    <div className="changePwdNotLoggedIn-form-actions">
                        <button type="button" className="changePwdNotLoggedIn-btn-cancel" onClick={cancelAndRedirect}>취소</button>
                        <button type="submit" className="changePwdNotLoggedIn-btn-save">저장</button>
                    </div>
                </form>
            </div>

            <div className="security-ads">
                <img src={securityAd1} alt="securityAd1" className="changePwdNotLoggedIn-securityAd1" />
                <img src={securityAd2} alt="securityAd2" className="changePwdNotLoggedIn-securityAd2" />
            </div>

            {popupOverlay && (
                <div id="popUpOverlay" className="pop-up-overlay">
                    <div className="pop-up-content">
                        <p id="popupMsg">{popupMsg}</p>
                        <button onClick={confirmAndRedirect}>확인</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChangePwdNotLoggedInForm;