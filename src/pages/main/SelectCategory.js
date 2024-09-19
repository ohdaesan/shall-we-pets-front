import React, { useState, useEffect } from 'react';
import './SelectCategory.css';
import circle from '../../images/SC-circle.png';
import cafe from '../../images/SC-cafe.png';
import culture from '../../images/SC-cultrue.png';
import trip from '../../images/SC-trip.png';
import hospital from '../../images/SC-hospital.png';
import service from '../../images/SC-service.png';
import flower1 from '../../images/Main-flower-left.png';
import flower2 from '../../images/Main-flower-right.png';


function SelectCategory() {
    return (
        <>
            <div className='sc-header'>
                <p1>서비스 선택</p1>
            </div>

            <div className='sc-content'>
                <div className='first-bar'>
                    <div className='first-button1'>
                        <a href="/selectCity">
                            <button className='button1'>
                                <img src={service}></img>
                                <p2>반려동물<br />서비스</p2>
                            </button>
                        </a>
                    </div>

                    <div className='first-button2'>
                        <a href="/selectCity">
                            <button className='button1'>
                                <img src={cafe}></img>
                                <p2>식당-카페</p2>
                            </button>
                        </a>
                    </div>

                    <div className='first-button3'>
                        <a href="/selectCity">
                            <button className='button1'>
                                <img src={trip}></img>
                                <p2>동반 여행</p2>
                            </button>
                        </a>
                    </div>
                </div>

                <div className='second-bar'>
                    <div className='second-button1'>
                        <a href="/selectCity">
                            <button className='button1'>
                                <img src={culture}></img>
                                <p2>문화시설</p2>
                            </button>
                        </a>
                    </div>

                    <div className='second-button2'>
                        <a href="/selectCity">
                            <button className='button1'>
                                <img src={hospital}></img>
                                <p2>애완 병원</p2>
                            </button>
                        </a>
                    </div>
                </div>

            </div>

            <div className='sc-flowers'>
                <img src={flower1}></img>
                <img src={flower2}></img>
            </div>

        </>
    );
}

export default SelectCategory;