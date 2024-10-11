import React, { useState } from 'react';
import './DeleteAccount.css';
import { useNavigate } from 'react-router-dom';
import { deleteMemberAPI } from '../../apis/MyInfoAPICalls';

function DeleteAccount() {
    const [reason, setReason] = useState('');
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/mypage');
    };

    const handleDelete = async () => {
        const confirmation = window.confirm("정말로 탈퇴하시겠습니까? 계정은 영구히 삭제되며 관련 법령에 따라 계정 정보는 일정 기간 보존될 수 있습니다.");
        if (confirmation) {
            try {
                const memberNo = localStorage.getItem('memberNo'); // 로그인된 회원의 ID를 로컬 스토리지에서 가져옴
                if (!memberNo) {
                    throw new Error('회원 번호를 찾을 수 없습니다.');
                }
                await deleteMemberAPI(memberNo);
                console.log("탈퇴 사유:", reason);
                localStorage.clear(); // 로컬 스토리지 클리어
                navigate('/'); // 메인 페이지로 리다이렉션
            } catch (error) {
                console.error("회원 탈퇴 중 오류 발생:", error);
                alert("회원 탈퇴 중 오류가 발생했습니다. 다시 시도해 주세요.");
            }
        }
    };
    return (
        <div className="deleteaccount-body">
            <h1 className="deleteaccount-h1">회원 탈퇴</h1>
            <div className="deleteaccount-container">
                <p>떠나신다니 아쉽습니다.</p>
                <p>쉘위펫츠를 떠나는 이유가 있다면 알려주세요. 해당 정보는 사이트의 운영 개선을 위해 사용됩니다.</p>
                <br /><br />
                <div className="deleteaccount-form-group">
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="탈퇴 사유를 작성해 주세요."
                        className="deleteaccount-textarea"
                    />
                </div>

                <div className="deleteaccount-form-actions">
                    <button type="button" className="deleteaccount-btn-cancel" onClick={handleCancel}>취소</button>
                    <button type="button" className="deleteaccount-btn-save" onClick={handleDelete}>탈퇴</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteAccount;