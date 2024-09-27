import React from 'react';

const ChatHeader = () => {
    return (
        <div className="chatHeader">
            <h1>셀위펫즈</h1>
            <p>안녕하세요, **님!</p> {/* 여기서 사용자 이름을 동적으로 넣을 수 있습니다. */}
        </div>
    );
};

export default ChatHeader;
