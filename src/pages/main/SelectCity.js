// SelectCity.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SelectCity.css';
import arrow from '../../images/Arrow 2.png';
import CDS from '../../images/eowjs.png';
import Gang from '../../images/강원.png';
import ZG from '../../images/광주.png';
import GBUD from '../../images/부산.png';
import GI from '../../images/인천.png';
import Seoul from '../../images/seoul (2).png';
import Jeju from '../../images/제주.png';

function SelectCity() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');

    const goToPostList = (city) => {
        navigate(`/postlist?city=${encodeURIComponent(city)}&category=${encodeURIComponent(category)}`);
    };

    return (
        <>
            <div className='SCT-header'>
                <p>애완 동반 지도</p>
            </div>

            <div className='arrows'>
                <img className='arrow1' src={arrow} alt="arrow" />
                <img className='arrow2' src={arrow} alt="arrow" />
                <img className='arrow3' src={arrow} alt="arrow" />
                <img className='arrow4' src={arrow} alt="arrow" />
            </div>

            <div className='buttons'>
                <div className='left'>
                    <button className='F-left1' onClick={() => goToPostList('충청, 대전, 세종')}>
                        <img src={CDS} alt="충청, 대전, 세종" />
                        <p>충청, 대전,<br />세종</p>
                    </button>

                    <button className='F-left2' onClick={() => goToPostList('강원')}>
                        <img src={Gang} alt="강원" />
                        <p>강원</p>
                    </button>
                </div>

                <div className='center-line'>
                    <button className='C-center1' onClick={() => goToPostList('경기, 인천')}>
                        <img src={GI} alt="경기, 인천" />
                        <p>경기, 인천</p>
                    </button>

                    <button className='C-center2' onClick={() => goToPostList('서울')}>
                        <img src={Seoul} alt="서울" />
                        <p>서울</p>
                    </button>

                    <button className='C-center3' onClick={() => goToPostList('제주')}>
                        <img src={Jeju} alt="제주" />
                        <p>제주</p>
                    </button>
                </div>

                <div className='second-line'>
                    <button className='S-right1' onClick={() => goToPostList('전라, 광주')}>
                        <img src={ZG} alt="전라, 광주" />
                        <p>전라, 광주</p>
                    </button>

                    <button className='S-right2' onClick={() => goToPostList('경상, 부산, 울산, 대구')}>
                        <img src={GBUD} alt="경상, 부산, 울산, 대구" />
                        <p>경상, 부산,<br />울산, 대구</p>
                    </button>
                </div>
            </div>
        </>
    );
}

export default SelectCity;
