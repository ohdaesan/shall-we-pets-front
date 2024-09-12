import React, { useState } from 'react';
import './PostDetail.css';
import img1 from '../../images/reviwImage1.png'; // 이미지 import
import chet from '../../images/Icon.png';
import share from '../../images/share.png';
import clock from '../../images/Clock.png';
import directions from '../../images/directions_car.png';
import location from '../../images/location_on.png';
import heart from '../../images/Heart.png';
import globe from '../../images/Globe.png';
import phone from '../../images/Phone.png';
import up from '../../images/up.png';
import down from '../../images/down.png';
import img2 from '../../images/2 2.png';
import sharing from '../../images/sharing.png';
import star from '../../images/Star.png';
import star2 from '../../images/star_filled.png';

const PostDetail = () => {
    const postDetails = {
        title: '개신나멍',
        description: '애견 동반 펜션',
        rating: 4.5,
        reviewCount: 76,
        images: [img1, img1, img1, img1],
    };

    // activeTab 상태 추가
    const [activeTab, setActiveTab] = useState('info'); // 초기값은 'info'

    // Toggle 상태 추가
    const [showMoreInfo, setShowMoreInfo] = useState(false);

    // 북마크 별
    const [isStarClicked, setIsStarClicked] = useState(false);

    // 탭을 클릭하면 해당 탭으로 변경
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    // Toggle 함수
    const handleToggleClick = () => {
        setShowMoreInfo(!showMoreInfo);
    };

    // 사진 4번째 리뷰란으로 가기
    const handleShowMoreClick = () => {
        handleTabClick('photo');
    };

    const handleStarClick = () => {
        setIsStarClicked(!isStarClicked); // 클릭 시 상태 변경
    };

    return (
        <div className="post-detail-container">
            {/* 이미지 섹션 */}
            <div className="post-images">
                {postDetails.images.map((image, index) => (
                    <div className="photo-container" key={index}>
                        <img
                            src={image}
                            alt={`post image ${index}`}
                            className={`post-image ${index === 3 ? 'overlay-image' : ''}`}
                        />
                        {index === 3 && (
                            <div className="show-more-button" onClick={handleShowMoreClick}>
                                + 더보기
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="post-info">
                <div className="post-info-left">
                    <div className="post-title-description">
                        <h1 className="post-title">{postDetails.title}</h1>
                        <p className="post-description">{postDetails.description}</p>
                    </div>
                    <div className="post-rating-review">
                        <div className="post-rating">⭐ {postDetails.rating}점</div>
                        <div className="post-review-count">방문자 리뷰 {postDetails.reviewCount}</div>
                    </div>
                </div>
                <div className="post-buttons">
                    <button className="post-button1">
                        <img src={chet} alt="문의 아이콘" /> 문의
                    </button>
                    <button className="post-button2">
                        <img src={share} alt="지도 아이콘" /> 지도
                    </button>
                </div>
            </div>

            <div className="line1"></div>

            <div className="post-actions">
            <div className="post-action-button" onClick={handleStarClick}>
                <div><img src={isStarClicked ? star2 : star} alt="저장하기" /></div>
                    <div>저장하기</div>
                </div>
                <div className="line2"></div>
                <div className="post-action-button">
                    <div><img src={sharing} alt="공유하기" /></div>
                    <div>공유하기</div>
                </div>
            </div>

            <div className="line1"></div>

            {/* 탭 UI */}
            <div className="post-tabs">
                <div
                    className={`post-tab ${activeTab === 'info' ? 'active' : ''}`}
                    onClick={() => handleTabClick('info')}
                >
                    정보
                </div>
                <div className="line3"></div>
                <div
                    className={`post-tab ${activeTab === 'review' ? 'active' : ''}`}
                    onClick={() => handleTabClick('review')}
                >
                    리뷰
                </div>
                <div className="line3"></div>
                <div
                    className={`post-tab ${activeTab === 'photo' ? 'active' : ''}`}
                    onClick={() => handleTabClick('photo')}
                >
                    사진
                </div>
            </div>

            <div className="line1"></div>

            {/* 탭에 따른 콘텐츠 렌더링 */}
            <div className="post-content">
                {activeTab === 'info' && (
                    <div className="content1">
                        <ul>
                            <li>
                                <img src={location} alt="주소" /> 인천 강화군 하점면 창후로 83-18 <br />
                                <img src={phone} alt="폰번호" /> 031-1234-1234<br />
                                <img src={clock} alt="영업시간" /> 월~금 09:00~18:00<br />
                                {showMoreInfo && (
                                    <>
                                        <img src={globe} alt="링크" /> https://blog.naver.com/dogsinna_mung<br />
                                        <img src={directions} alt="주차" /> 주차 가능<br />
                                        <img src={heart} alt="반입가능한 동물 사이즈" /> 반입 가능한 반려동물 사이즈: 모두 가능<br />
                                        <img src={heart} alt="반입 가능한 반려동물 종" /> 반입 가능한 반려동물 종: 모두 가능<br />
                                        <img src={heart} alt="공간 제한" /> 공간 제한: 마당, 1층만 입장 가능<br />
                                        <img src={heart} alt="반려동물 전용 의자 여부" /> 반려동물 전용 의자: 없음
                                    </>
                                )}
                            </li>
                        </ul>
                        <div className="toggle-button" onClick={handleToggleClick}>
                            {showMoreInfo ? (
                                <>
                                    정보 접기 <img src={up} alt="접기 아이콘" />
                                </>
                            ) : (
                                <>
                                    정보 더보기 <img src={down} alt="더보기 아이콘" />
                                </>
                            )}
                        </div>
                    </div>
                )}
                {activeTab === 'review' && <div className="content2">
                    {/* 리뷰 내용 */}
                </div>}
                {activeTab === 'photo' && <div className="content3">
                    <div className='photoLists'>
                        <div className='PList1'>
                            <div className='photo1'><img src={img2} alt="사진1" /></div>
                            <div className='photo2'><img src={img2} alt="사진2" /></div>
                            <div className='photo3'><img src={img2} alt="사진3" /></div>
                            <div className='photo4'><img src={img2} alt="사진4" /></div>
                        </div>

                        <div className='PList2'>
                            <div className='photo5'><img src={img2} alt="사진5" /></div>
                            <div className='photo6'><img src={img2} alt="사진6" /></div>
                            <div className='photo7'><img src={img2} alt="사진7" /></div>
                            <div className='photo8'><img src={img2} alt="사진8" /></div>
                        </div>


                        <div className='PList3'>
                            <div className='photo9'><img src={img2} alt="사진9" /></div>
                            <div className='photo10'><img src={img2} alt="사진10" /></div>
                            <div className='photo11'><img src={img2} alt="사진11" /></div>
                            <div className='photo12'><img src={img2} alt="사진12" /></div>
                        </div>

                        <div className='PList4'>
                            <div className='photo13'><img src={img2} alt="사진13" /></div>
                            <div className='photo14'><img src={img2} alt="사진14" /></div>
                            <div className='photo15'><img src={img2} alt="사진15" /></div>
                            <div className='photo16'><img src={img2} alt="사진16" /></div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default PostDetail;
