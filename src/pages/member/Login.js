import React, { useState, useEffect } from 'react';
import './Login.css';
import puppy1 from '../../images/puppy1.jpg';
import puppy2 from '../../images/puppy2.jpg';

function Login() {
    const bodyStyle = {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    };

    const containerStyle = {
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        height: 'calc(50vh)',
        alignItems: 'center',
        gap: '10%',
        marginTop: '30px',
    };

    const contentStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
    };

    const inputStyle = {
        width: '350px',
        height: '40px',
        borderRadius: '20px',
        border: '1px solid #d0d0d0',
        paddingLeft: '15px',
        fontSize: '16px',
        fontFamily: "Noto Serif KR",
    };

    const buttonStyle = {
        width: '370px',
        height: '45px',
        borderRadius: '20px',
        backgroundColor: '#cce697',
        border: 'none',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#6a8346',
        cursor: 'pointer',
        fontFamily: "Noto Serif KR",
    };

    const imageStyle = {
        width: '412px',
        height: '270px',
        borderRadius: '15px',
        transition: 'opacity 1s',
        opacity: 1,
    };

    const checkboxStyle = {
        marginTop: '10px',
        marginBottom: '10px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '14px',
        color: '#707070',
        fontWeight: 'bolder',
    };

    const linkStyle = {
        color: '#707070',
        textDecoration: 'none',
        fontWeight: 'bolder',
    };

    const puppyImages = [
        puppy1, puppy2
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setOpacity(0);  // fade out
            
            setTimeout(() => {  // fade out 이후 이미지 변경
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % puppyImages.length);
                setOpacity(1); // fade back in
            }, 500);
            
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div style={bodyStyle} id='login-body'>
            <div style={containerStyle} className='login-container'>
                <div style={contentStyle} className='login-form-group'>
                    <h1 id='login-h1'>로그인</h1>
                    <input
                        type='text'
                        placeholder='아이디'
                        style={inputStyle}
                    />

                    <input
                        type='password'
                        placeholder='비밀번호'
                        style={inputStyle}
                    />

                    <div style={checkboxStyle}>
                        <div>
                            <input type='checkbox' id='remember-id' />
                            <label htmlFor='remember-id'>아이디 저장</label>
                        </div>

                        <div>
                            <a href='#' style={linkStyle}>아이디 찾기</a>&nbsp;|&nbsp;
                            <a href='#' style={linkStyle}>비밀번호 찾기</a>
                        </div>
                    </div>

                    <button style={buttonStyle}>로그인</button>
                    <a href='/signup'><button style={buttonStyle}>회원가입</button></a>
                </div>

                <div className="image-container">
                    <img 
                        src={puppyImages[currentImageIndex]} 
                        alt='puppies' 
                        style={{ ...imageStyle, opacity: opacity }} // fade in & out
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;
