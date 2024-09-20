import React, { useState } from 'react';
import './ChangePwdNotLoggedIn.css';
import securityAd1 from '../../images/securityad1.png';
import securityAd2 from '../../images/securityad2.png';
import { changePwdNotLoggedInAPI } from '../../apis/MemberAPICalls';

function ChangePwdNotLoggedIn() {
    const [form, setForm] = useState({
        newPassword: '',
        confirmNewPassword: '',
    });

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
                if(response.success) {
                    localStorage.removeItem("memberId");

                    // TODO: 비밀번호 변경 성공 창 띄우기

                }
            }
        } catch (error) {
            // TODO: 비밀번호 변경 실패 처리
            
        }
    };

    // TODO: 취소 버튼에 대한 처리

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
                                minLength="8"
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
                                minLength="8"
                                maxLength="20"
                                value={form.confirmNewPassword}
                                onChange={handleChange}
                                placeholder="8자 이상 20자 이내로 입력"
                            />
                        </div>
                    </div>

                    <div className="changePwdNotLoggedIn-form-actions">
                        <button type="button" className="changePwdNotLoggedIn-btn-cancel">취소</button>
                        <button type="submit" className="changePwdNotLoggedIn-btn-save">저장</button>
                    </div>
                </form>
            </div>

            <div className="security-ads">
                <img src={securityAd1} alt="securityAd1" className="changePwdNotLoggedIn-securityAd1" />
                <img src={securityAd2} alt="securityAd2" className="changePwdNotLoggedIn-securityAd2" />
            </div>
        </div>
    );
}

export default ChangePwdNotLoggedIn;