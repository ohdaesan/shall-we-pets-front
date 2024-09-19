import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { callLoginAPI } from '../../apis/MemberAPICalls';
import puppy1 from '../../images/puppy1.jpg';
import puppy2 from '../../images/puppy2.jpg';

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const result = useSelector(state => state.loginReducer);
    const loginStatus = !!localStorage.getItem('loggedIn');

    const puppyImages = [puppy1, puppy2];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [opacity, setOpacity] = useState(1);
    const [loginInfo, setLoginInfo] = useState({ memberId: '', memberPwd: '' });
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [warningMessage, setWarningMessage] = useState('');

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prev => ({
            ...prev,
            [name]: value
        }));

        // 로그인 버튼 활성화/비활성화
        setIsButtonDisabled(!loginInfo.memberId.trim() || !loginInfo.memberPwd.trim());
    }

    const onClickHandler = () => {
        dispatch(callLoginAPI(loginInfo));
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setOpacity(0);
            setTimeout(() => {
                setCurrentImageIndex(prevIndex => (prevIndex + 1) % puppyImages.length);
                setOpacity(1);
            }, 500);
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (result?.error) {
            setWarningMessage('아이디 또는 비밀번호가 다릅니다.');
            setLoginInfo({ memberId: '', memberPwd: '' });
        } else if (loginStatus) {
            setWarningMessage('');
            alert('로그인 성공!');
            navigate('/');
        }
    }, [result]);

    useEffect(() => {
        // 로그인 버튼 활성화/비활성화
        setIsButtonDisabled(!loginInfo.memberId.trim() || !loginInfo.memberPwd.trim());
    }, [loginInfo]);

    return (
        <div id='login-body'>
            <div className='login-container'>
                <div className='login-form-group'>
                    <h1 id='login-h1'>로그인</h1>
                    <input
                        type='text'
                        placeholder='아이디'
                        className='login-input'
                        name='memberId'
                        value={loginInfo.memberId}
                        onChange={onChangeHandler}
                    />
                    <div>
                        <input
                            type='password'
                            placeholder='비밀번호'
                            className='login-input'
                            name='memberPwd'
                            value={loginInfo.memberPwd}
                            onChange={onChangeHandler}
                        />
                        {warningMessage && <div className='warning-message'>{warningMessage}</div>}
                    </div>
                    <div className='checkbox-style'>
                        <div>
                            <input type='checkbox' id='remember-id' /> &nbsp;
                            <label htmlFor='remember-id'>아이디 저장</label>
                        </div>
                        <div>
                            <a href='/member/findid' className='link-style'>아이디 찾기</a>&nbsp;|&nbsp;
                            <a href='/member/findpwd' className='link-style'>비밀번호 찾기</a>
                        </div>
                    </div>
                    <button
                        className='login-button'
                        onClick={onClickHandler}
                        disabled={isButtonDisabled}
                    >
                        로그인
                    </button>
                    <a href='/member/register'><button className='login-button'>회원가입</button></a>
                </div>
                <div className='image-container'>
                    <img 
                        src={puppyImages[currentImageIndex]} 
                        alt='puppies' 
                        className='image-fade'
                        style={{ opacity: opacity }}
                    />
                </div>
            </div>
        </div>
    );
}

export default LoginForm;