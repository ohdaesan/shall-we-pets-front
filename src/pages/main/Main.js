import React, { useState, useEffect } from 'react';
import './Main.css';
import start from '../../images/arrow_back.png';
import cloud1 from '../../images/cloud1.png';
import cloud2 from '../../images/cloud2.png';
import cloud3 from '../../images/cloud3.png';
import circle1 from '../../images/Main-circle-1.png';
import circle2 from '../../images/Main-circle-2.png';
import mainImgG from '../../images/Main-girl&dog.png';
import mainImgB from '../../images/Main-boy&dog.png';
import flower1 from '../../images/Main-flower-left.png';
import flower2 from '../../images/Main-flower-right.png';

function Main() {
    return (
        <>
            <div className='main-header'>
                <div className='main-title'>
                    <p1>Happy</p1><p2> & with my</p2><p3> pet!!</p3>
                    <br />
                    <p4>애견 동반가능 서비스 & </p4>
                    <br />
                    <p4>업체 검색 제공 서비스</p4>
                </div>

                <div className='clouds'>
                    <div className='first-clouds'>
                        <img src={cloud1}></img>
                        <img src={cloud2}></img>
                    </div>
                    <div className='second-clouds'>
                        <img src={cloud3}></img>
                        <img src={cloud3}></img>
                    </div>
                </div>

            </div>

            <div className='main-content'>
                <div className='main-button'>
                    <div className='button-bar'>
                        <img className='left-bar2' src={circle2}></img>

                        <img className='right-bar2' src={circle2}></img>
                    </div>



                <div className='button-texts'>
                    <a href='/myInfo'>
                        <button className='button-text1'>
                            마이페이지
                        </button>
                    </a>

                    <a href='/selectCategory'>
                        <button className='button-text2'>
                            서비스 <br />사용하기
                        </button>
                    </a>
                </div>

                    <div className='main-img'>
                        <img src={mainImgG}></img>
                        <img src={mainImgB}></img>
                    </div>


                    <div className='main-flowers'>
                        <img src={flower1}></img>
                        <img src={flower2}></img>
                    </div>
                </div>


            </div>
        </>
    );
}

export default Main;