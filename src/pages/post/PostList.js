// PostList.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PostList.css';
import marking from '../../images/marking.png';
import img1 from '../../images/2 2.png';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import searching from '../../images/Search.png';

// 이미지 경로들 다시 확인
import CDS from '../../images/eowjs.png';
import Gang from '../../images/강원.png';
import ZG from '../../images/광주.png';
import GBUD from '../../images/부산.png';
import GI from '../../images/인천.png';
import Seoul from '../../images/seoul (2).png';
import Jeju from '../../images/제주.png';

function PostList() {
    const location = useLocation();
    const [searchKeyword, setSearchKeyword] = useState('');

    // URL 쿼리 파라미터에서 'city'와 'category' 값을 추출
    const queryParams = new URLSearchParams(location.search);
    const city = decodeURIComponent(queryParams.get('city')) || '서울';
    const category = decodeURIComponent(queryParams.get('category')) || '반려동물 서비스'; // Default category

    // Define city groups and their images
    const cityGroups = {
        '서울': ['서울'],
        '제주': ['제주'],
        '강원': ['강원'],
        '경기, 인천': ['경기', '인천'],
        '경상, 부산, 울산, 대구': ['경상', '부산', '울산', '대구'],
        '충청, 대전, 세종': ['충청', '대전', '세종'],
        '전라, 광주': ['전라', '광주']
    };

    const cityImages = {
        '서울': Seoul,
        '제주': Jeju,
        '강원': Gang,
        '경기, 인천': GI,
        '경상, 부산, 울산, 대구': GBUD,
        '충청, 대전, 세종': CDS,
        '전라, 광주': ZG
    };

    const reviews = [
        { id: 1, name: "331멍팔소", category: "반려동물 서비스", address: "서울시 강남구 역삼동 724-45", city: "서울" },
        { id: 2, name: "221멍팔소", category: "반려동물 서비스", address: "서울시 강남구 역삼동 724-45", city: "서울" },
        { id: 3, name: "111멍팔소", category: "반려동물 서비스", address: "경기도 용인시 수지구 이종무로 157", city: "경기" },
        { id: 4, name: "800멍팔소", category: "반려동물 서비스", address: "서울시 강남구 역삼동 724-45", city: "서울" },
        { id: 5, name: "555멍팔소", category: "반려동물 서비스", address: "제주시 애월읍 고내리 12", city: "제주" },
        
        // 식당-카페
        { id: 6, name: "카페 맛집", category: "식당-카페", address: "서울시 강남구 테헤란로 123", city: "서울" },
        { id: 7, name: "이탈리안 레스토랑", category: "식당-카페", address: "서울시 홍대 456", city: "서울" },
        { id: 8, name: "해물탕 전문점", category: "식당-카페", address: "경기도 고양시 일산서구 789", city: "경기" },
        { id: 9, name: "카페 라떼", category: "식당-카페", address: "제주시 한림읍 34", city: "제주" },

        // 동반 여행
        { id: 10, name: "애견 동반 숙소", category: "동반 여행", address: "강원도 평창군 123-45", city: "강원" },
        { id: 11, name: "펫과 함께 가는 캠핑장", category: "동반 여행", address: "경기도 가평군 678-90", city: "경기" },

        // 문화시설
        { id: 12, name: "예술의 전당", category: "문화시설", address: "서울시 서초구 1번지", city: "서울" },
        { id: 13, name: "국립박물관", category: "문화시설", address: "서울시 용산구 2번지", city: "서울" },

        // 애완 병원
        { id: 14, name: "서울 애완병원", category: "애완 병원", address: "서울시 강남구 3-1", city: "서울" },
        { id: 15, name: "제주 애완병원", category: "애완 병원", address: "제주시 4-2", city: "제주" },

    ];

    // Get the list of cities in the selected city group
    const selectedCities = cityGroups[city] || [];

    // Filter reviews based on the selected city group and category
    const filteredReviews = reviews.filter(review =>
        selectedCities.includes(review.city) &&
        review.name.includes(searchKeyword) &&
        review.category === category
    );

    const cityPhoto = cityImages[city] || Seoul;

    return (
        <>
            <div className='content-postList-1'>
                <div className='listContentHeader'>
                    <div className='left-section'>
                        <div className='seletedCity'>
                            <img src={marking} alt="Marking" />
                            <div className='cityName'>{city}</div> {/* 도시 이름 표시 */}
                        </div>
                        <div className='selected-category'>{category}</div>
                        <div className='select-detail-location'>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    지역선택 (시,군,구)
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">강남구</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">은평구</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">광진구</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className='seleted-city-photo'>
                        <img src={cityPhoto} alt={city} />
                    </div>
                </div>

                <div className="searching">
                    <input
                        type="text"
                        placeholder="검색할 단어를 입력해주세요"
                        value={searchKeyword}
                        className="searching-bar"
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                </div>

                <div className='listContent'>
                    <div className='posts'>
                        {filteredReviews.length > 0 ? (
                            filteredReviews.map(review => (
                                <div key={review.id} className='post'>
                                    <div className='listInfo-details'>
                                        <div className='listInfo-name'>{review.name}</div>
                                        <div className='listInfo-category'>{review.category}</div>
                                        <div className='listInfo-address'>{review.address}</div>
                                    </div>
                                    <div className='listInfo-images'>
                                        <img src={img1} alt="Image 1" />
                                        <img src={img1} alt="Image 2" />
                                        <img src={img1} alt="Image 3" />
                                        <img src={img1} alt="Image 4" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>해당 도시의 리뷰가 없습니다.</div>
                        )}
                    </div>
                </div>
                <ButtonToolbar aria-label="Toolbar with button groups">
                    <ButtonGroup className="me-2" aria-label="First group">
                        <Button>1</Button> <Button>2</Button> <Button>3</Button>{' '}
                        <Button>4</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </div>
        </>
    );
}

export default PostList;
