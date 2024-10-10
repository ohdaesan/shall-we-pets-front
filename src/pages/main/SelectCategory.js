// SelectCategory.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        // Navigate to the next page with the selected category as a query parameter
        navigate(`/selectCity?category=${encodeURIComponent(category)}`);
    };

    return (
        <div className='select-category-body'>
            <div className='sc-header'>
                <p1>서비스 선택</p1>
            </div>

            <div className='sc-content'>
                <div className='first-bar'>
                    <div className='first-button1'>
                        <button className='button1' onClick={() => handleCategoryClick('반려동물_서비스')}>
                            <img src={service}></img>
                            <p2>반려동물<br />서비스</p2>
                        </button>
                    </div>

                    <div className='first-button2'>
                        <button className='button1' onClick={() => handleCategoryClick('식당-카페')}>
                            <img src={cafe}></img>
                            <p2>식당-카페</p2>
                        </button>
                    </div>

                    <div className='first-button3'>
                        <button className='button1' onClick={() => handleCategoryClick('동반 여행')}>
                            <img src={trip}></img>
                            <p2>동반 여행</p2>
                        </button>
                    </div>
                </div>

                <div className='second-bar'>
                    <div className='second-button1'>
                        <button className='button1' onClick={() => handleCategoryClick('문화시설')}>
                            <img src={culture}></img>
                            <p2>문화시설</p2>
                        </button>
                    </div>

                    <div className='second-button2'>
                        <button className='button1' onClick={() => handleCategoryClick('애완 병원')}>
                            <img src={hospital}></img>
                            <p2>애완 병원</p2>
                        </button>
                    </div>
                </div>
            </div>

            <div className='sc-flowers'>
                <img src={flower1}></img>
                <img src={flower2}></img>
            </div>
        </div>
    );
}

export default SelectCategory;
