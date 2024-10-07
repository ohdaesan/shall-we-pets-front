import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePasswordAPI } from '../../apis/MyInfoAPICalls';
import './ChangePassword.css';
import securityAd1 from '../../images/securityad1.png';
import securityAd2 from '../../images/securityad2.png';

function ChangePassword() {
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const memberNo = localStorage.getItem('memberNo');

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!memberNo) {
            setError("사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요.");
            return;
        }
    
        if (!form.currentPassword || !form.newPassword || !form.confirmNewPassword) {
            setError("모든 필드를 입력해주세요.");
            return;
        }
    
        if (!validatePassword(form.newPassword)) {
            setError("새 비밀번호는 최소 8자 이상, 하나의 문자, 숫자 및 특수 문자를 포함해야 합니다.");
            return;
        }
    
        if (form.newPassword.length < 8 || form.newPassword.length > 20) {
            setError("새 비밀번호는 8자 이상 20자 미만이어야 합니다.");
            return;
        }
        
        if (form.newPassword !== form.confirmNewPassword) {
            setError("새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.");
            return;
        }
        
        if (window.confirm("비밀번호를 정말로 변경하시겠습니까?")) {
            const passwordData = {
                currentPassword: form.currentPassword,
                newPassword: form.newPassword,
                confirmNewPassword: form.confirmNewPassword
            };
    
            try {
                await changePasswordAPI(memberNo, passwordData);
                alert("비밀번호가 성공적으로 변경되었습니다.");
                navigate('/mypage/my_info');
            } catch (error) {
                console.error('비밀번호 변경 중 오류 발생:', error);
                if (error.response) {
                    if (error.response.status === 401) {
                        setError("현재 비밀번호가 일치하지 않습니다.");
                    } else if (error.response.status === 404) {
                        setError("회원 정보를 찾을 수 없습니다. 다시 로그인해주세요.");
                    } else {
                        setError(error.response.data || "비밀번호 변경 중 오류가 발생했습니다.");
                    }
                } else {
                    setError("서버와의 통신 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.");
                }
            }
        }
    };

    const handleCancel = () => {
        navigate('/mypage/my_info');
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
                            <label htmlFor="currentPassword">현재 비밀번호</label>
                            <input
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                minLength="8"
                                maxLength="20"
                                value={form.currentPassword}
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