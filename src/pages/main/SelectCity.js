import React, { useState, useEffect } from 'react';
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
    return (
        <>
            <div className='SCT-header'>
                <p>애완 동반 지도</p>
            </div>

            <div className='arrows'>
                <img className='arrow1' src={arrow}></img>
                <img className='arrow2' src={arrow}></img>
                <img className='arrow3' src={arrow}></img>
                <img className='arrow4' src={arrow}></img>
            </div>

            <div className='buttons'>
                <div className='left'>
                    <button className='F-left1'>
                        <img src={CDS}></img>
                        <p2>충천,대전,<br/>
                        세종</p2>
                    </button>

                    <button className='F-left2'>
                        <img src={Gang}></img>
                        <p2>강원</p2>
                    </button>
                </div>

                <div className='center-line'>
                    <button className='C-center1'>
                        <img src={GI}></img>
                        <p2>경기, 인천</p2>
                    </button>

                    <button className='C-center2'>
                        <img src={Seoul}></img>
                        <p2>서울</p2>
                    </button>

                    <button className='C-center3'>
                        <img src={Jeju}></img>
                        <p2>제주</p2>
                    </button>
                </div>

                <div className='second-line'>
                    <button className='S-right1'>
                        <img src={ZG}></img>
                        <p2>전라, 광주</p2>
                    </button>

                    <button className='S-right2'>
                        <img src={GBUD}></img>
                        <p2>경상, 부산,<br/>
                        울산, 대구</p2>
                    </button>
                </div>


            </div>

        </>
    )
}

export default SelectCity;