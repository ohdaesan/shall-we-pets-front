import React, { useState } from 'react';
import './ChangePassword.css';
import securityAd1 from '../../images/securityad1.png';
import securityAd2 from '../../images/securityad2.png';

function ChangePassword() {
    const [form, setForm] = useState({
        password: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", form);
        // 여기에 비밀번호 변경 로직을 추가하세요
    };

    return (
        <div className="changePassword-body">
            <h1 className="changePassword-h1">비밀번호 변경</h1>
            <div className="changePassword-container">
                <hr />
                <br />
                <br />

                <form onSubmit={handleSubmit}>
                    <div className="form-fields">
                        <div className="form-group">
                            <label htmlFor="password">현재 비밀번호</label>
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

                        <div className="form-group">
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

                    <div className="form-actions">
                        <button type="button" className="btn-cancel">취소</button>
                        <button type="submit" className="btn-save">저장</button>
                    </div>
                </form>
            </div>

            <div className="security-ads">
                <img src={securityAd1} alt="securityAd1" className="securityAd1" />
                <img src={securityAd2} alt="securityAd2" className="securityAd2" />
            </div>
        </div>
    );
}

export default ChangePassword;