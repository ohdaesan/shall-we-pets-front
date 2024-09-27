import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChangePassword.css';
import securityAd1 from '../../images/securityad1.png';
import securityAd2 from '../../images/securityad2.png';

function ChangePassword() {
    const [form, setForm] = useState({
        password: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const [error, setError] = useState(''); // 에러 메시지를 저장할 상태 추가
    const navigate = useNavigate(); // useNavigate로 변경

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setError(''); // 입력 시 에러 메시지를 초기화
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 비밀번호 길이 검증
        if (form.password.length < 8 || form.password.length > 20) {
            alert("비밀번호가 형식에 맞지 않습니다."); // 실패 팝업
            return;
        }

        // 새 비밀번호와 새 비밀번호 확인 일치 여부 검증
        if (form.newPassword !== form.confirmNewPassword) {
            setError("새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다."); // 에러 메시지 설정
            return;
        }

        if (window.confirm("비밀번호를 정말로 변경하시겠습니까?")) {
            alert("비밀번호가 성공적으로 변경되었습니다."); // 성공 메시지
            navigate('/mypage/my_info'); // /mypage/my_info로 이동
        }
    };

    const handleCancel = () => {
        navigate('/mypage/my_info'); // 취소 클릭 시 /mypage/my_info로 이동
    };

    return (
        <div className="changepassword-body">
            <h1 className="changepassword-h1">비밀번호 변경</h1>
            <div className="changepassword-container">
                <hr />
                <br />
                <br />

                <form className="changepassword-form" onSubmit={handleSubmit}>
                    <div className="changepassword-form-fields">
                        <div className="changepassword-form-group">
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

                        <div className="changepassword-form-group">
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

                        <div className="changepassword-form-group">
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

                        {/* 새 비밀번호와 확인된 비밀번호 불일치 시 경고 메시지 */}
                        {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
                    </div>

                    <div className="changepassword-form-actions">
                        <button type="button" className="changepassword-btn-cancel" onClick={handleCancel}>취소</button>
                        <button type="submit" className="changepassword-btn-save">저장</button>
                    </div>
                </form>
            </div>

            <div className="changepassword-security-ads">
                <img src={securityAd1} alt="securityAd1" className="changepassword-securityAd1" />
                <img src={securityAd2} alt="securityAd2" className="changepassword-securityAd2" />
            </div>
        </div>
    );
}

export default ChangePassword;

