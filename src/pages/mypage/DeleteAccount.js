import React, { useState } from 'react';
import './DeleteAccount.css';

function DeleteAccount() {
    const [reason, setReason] = useState('');

    const handleCancel = () => {
        // 취소 버튼 눌렀을 때 동작
        console.log("탈퇴 취소");
    };

    const handleDelete = () => {
        // 탈퇴 진행 버튼 눌렀을 때 동작
        console.log("탈퇴 사유:", reason);
    };

    return (
        <div className="deleteaccount-body">
            <h1 className="deleteaccount-h1">회원 탈퇴</h1>
            <div className="deleteaccount-container">
                <p>떠나신다니 아쉽습니다.</p>
                <p>쉘위펫츠를 떠나는 이유가 있다면 알려주세요. 해당 정보는 사이트의 운영 개선을 위해 사용됩니다.</p>
                <br /><br />
                <div className="form-group">
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="탈퇴 사유를 작성해 주세요."
                        className="deleteaccount-textarea"
                    />
                </div>

                <div className="form-actions">
                    <button type="button" className="btn-cancel">취소</button>
                    <button type="submit" className="btn-save">저장</button>
                </div>

            </div>

        </div>
    );
}

export default DeleteAccount;