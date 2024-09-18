import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { callLoginAPI } from '../../apis/MemberAPICalls';
import { resetLoginUser } from "../../modules/MemberModule";
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

    /* input 태그 입력 값 state 관리 */
    const [loginInfo, setLoginInfo] = useState(
        {
            memberId : '',
            memberPwd : ''
        }
    );

    /* 입력 값 변경 시 이벤트 핸들러 */
    const onChangeHandler = (e) => {
        setLoginInfo(
            {
                ...loginInfo,
                [e.target.name] : e.target.value
            }
        );
    }

    /* 로그인 버튼 클릭 시 동작 */
    const onClickHandler = () => {
        /* loginInfo에 대한 유효성 검사 후 호출 */
        dispatch(callLoginAPI(loginInfo));
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setOpacity(0);      // fade out
            
            setTimeout(() => {  // fade out 이후 이미지 변경
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % puppyImages.length);
                setOpacity(1);  // fade back in
            }, 500);
            
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    /* 로그인 후 성공 실패 동작 */
    useEffect(
        () => {
            if(result?.error) {
                alert('로그인 실패: 아이디와 비밀번호를 확인해주세요.');
                setLoginInfo(
                    {
                        memberId : '',
                        memberPwd : ''
                    }
                );
                dispatch(resetLoginUser());
            } else

            if(loginStatus){
                alert('로그인 성공!');
                navigate('/');
            } 
        },
        [result]
    );

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

                    <input
                        type='password'
                        placeholder='비밀번호'
                        className='login-input'
                        name='memberPwd'
                        value={loginInfo.memberPwd}
                        onChange={onChangeHandler}
                    />

                    <div className='checkbox-style'>
                        <div>
                            <input type='checkbox' id='remember-id'/> &nbsp;
                            <label htmlFor='remember-id'>아이디 저장</label>
                        </div>

                        <div>
                            <a href='/member/findid' className='link-style'>아이디 찾기</a>&nbsp;|&nbsp;
                            <a href='/member/findpwd' className='link-style'>비밀번호 찾기</a>
                        </div>
                    </div>

                    <button className='login-button' onClick={onClickHandler}>로그인</button>
                    <a href='/member/register'><button className='login-button'>회원가입</button></a>
                </div>

                <div className='image-container'>
                    <img 
                        src={puppyImages[currentImageIndex]} 
                        alt='puppies' 
                        className='image-fade'
                        style={{ opacity: opacity }} // fade in & out
                    />
                </div>
            </div>
        </div>
    );
}

export default LoginForm;