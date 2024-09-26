import { useParams } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
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
import reviewer from '../../images/7.png';
import plus from '../../images/plus.png';
import { getPostDetailAPI } from '../../apis/PostAPICalls';

const PostDetail = () => {
    const { postNo } = useParams(); // URL에서 postNo를 가져옵니다.
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);



    // activeTab 상태 추가
    const [activeTab, setActiveTab] = useState('info'); // 초기값은 'info'

    // Toggle 상태 추가
    const [showMoreInfo, setShowMoreInfo] = useState(false);

    // 북마크 별
    const [isStarClicked, setIsStarClicked] = useState(false);

    // 리뷰 4개 토글
    const [showMoreImages, setShowMoreImages] = useState(false);

    // 체크박스 리뷰사진만
    const [isChecked, setIsChecked] = useState(false); // Checkbox state

    // fillter 기능
    const [activeFilter, setActiveFilter] = useState('recent'); // 초기값은 'recent'

    // 리뷰 작성 및 별점 남기기
    const [rating, setRating] = useState(0); // 리뷰 평점 상태
    const [showInput, setShowInput] = useState(false); // 입력창 표시 상태

    // 정보 db 받아오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching post details for postNo:', postNo);
                const response = await getPostDetailAPI(postNo);
                console.log(response);
                
                if (response.results.post) {
                    // const data = await response.json();
                    setInfo(response.results.post);
                    console.log("불러왔는데...");
                    
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Fetch error: ', error);
            } finally {
                setLoading(false);
                console.log("불러온거지?");
                
            }
        };

        if (postNo) {
            fetchData();
            console.log("진짜");
            
        }
    }, [postNo]);


    // fillter 온클릭
    const handleFilterClick = (filter) => {
        setActiveFilter(filter); // 클릭한 필터로 상태 변경
    };
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

    // 리뷰 사진 4개일 때 토글 기능
    const handleImageToggleClick = () => {
        setShowMoreImages(!showMoreImages); // Toggle additional images
    };

    // 리뷰 필터기능 체크박스
    const handleCheckboxChange = () => setIsChecked(!isChecked);

    // 리뷰 작성 별점
    const handleStarClick_review = (index) => {
        setRating(index); // 클릭된 별 개수로 상태 업데이트
        setShowInput(true); // 별 클릭 시 입력창 표시
    };


    if (loading) return <div>로딩 중...</div>;

    if (!info) return <div>정보가 없습니다.</div>;

    const { fcltyNm, ctgryTwoNm, ctgryThreeNm, ctyprvnNm, signguNm, legalDongNm, liNm, lnbrNm, roadNm, buldNo, lcLa, lcLo, zipNo, rdnmadrNm, lnmAddr, telNo, hmpgUrl, rstdeGuidCn, operTime, parkngPosblAt, utilizaPrcCn, petPosblAt, entrnPosblPetSizeValue,petLmttMtrCn,   inPlaceAcpPosblAt, outPlaceAcpPosblAt, fcltyInfoDc, petAcpAditChrgeValue, memberNo, createdDate, status, statusExplanation, viewCount } = info;
    return (
        <div className="post-detail-container">
            {/* 이미지 섹션 */}
            <div className="post-images">
                {/* {PostDetails.images.map((image, index) => (
                    <div className="photo-container" key={index}>
                        <img
                            src={image}
                            alt={`post image ${index}`}
                            className={`post-image ${index === 3 ? 'overlay-image' : ''}`}
                        /> */}
                        {/* 4번째 사진을 누르면 사진란으로 가는 버튼 */}
                        {/* {index === 3 && (
                            <div className="show-more-button" onClick={handleShowMoreClick}>
                                + 더보기
                            </div>
                        )}
                    </div>
                ))} */}
            </div>

            <div className="post-info">
                <div className="post-info-left">
                    <div className="post-title-description">
                        <h1 className="post-title">{fcltyNm}</h1>
                        <p className="post-description">{ctgryTwoNm}</p>
                    </div>
                    <div className="post-rating-review">
                        <div className="post-rating">⭐ 몇 점</div>
                        <div className="post-review-count">방문자 리뷰 수: </div>
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
            {lnmAddr && (
                <>
                    <img src={location} alt="주소" /> {lnmAddr} <br />
                </>
            )}
            {telNo && (
                <>
                    <img src={phone} alt="폰번호" /> {telNo} <br />
                </>
            )}
            {operTime && (
                <>
                    <img src={clock} alt="영업시간" /> {operTime} <br />
                </>
            )}
            {showMoreInfo && (
                <>
                    {hmpgUrl && (
                        <>
                            <img src={globe} alt="링크" /> {hmpgUrl} <br />
                        </>
                    )}
                    {parkngPosblAt && (
                        <>
                            <img src={directions} alt="주차" /> 주차: {parkngPosblAt} <br />
                        </>
                    )}
                    {entrnPosblPetSizeValue && (
                        <>
                            <img src={heart} alt="반입가능한 동물 사이즈/종" /> 사이즈/종: {entrnPosblPetSizeValue} <br />
                        </>
                    )}
                    {petLmttMtrCn && (
                        <>
                            <img src={heart} alt="입장 제한" /> 입장 제한: {petLmttMtrCn} <br />
                        </>
                    )}
                    {inPlaceAcpPosblAt && (
                        <>
                            <img src={heart} alt="실내 입장 여부" /> 실내 입장 여부: {inPlaceAcpPosblAt} <br />
                        </>
                    )}
                    {outPlaceAcpPosblAt && (
                        <>
                            <img src={heart} alt="실외 입장 여부" /> 실외 입장 여부: {outPlaceAcpPosblAt} <br />
                        </>
                    )}
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
                    {activeTab === 'review' && (
                        <div className="content2">
                            {/* 리뷰 작성란  */}

                            <div className='registReview'>
                                <div className='review-create-header'>
                                    방문 후기를 남겨주세요!
                                </div>

                                {/* 별점 선택 */}
                                <div className='review-stars'>
                                    {[1, 2, 3, 4, 5].map((starIndex) => (
                                        <img
                                            key={starIndex}
                                            src={rating >= starIndex ? star2 : star}
                                            alt={`${starIndex} star`}
                                            onClick={() => handleStarClick_review(starIndex)}
                                            className="star-image"
                                        />
                                    ))}
                                </div>
                                {!showInput && !isStarClicked && (
                                    <>
                                        <div className="reward-text">
                                            리뷰 작성 시 10pt 적립!
                                        </div>
                                        <div className="line1"></div>

                                    </>
                                )}


                                {/* 입력창 표시 */}
                                {showInput && (
                                    <>
                                        <input
                                            type="text"
                                            placeholder="리뷰 내용을 작성하세요"
                                            className="review-input"
                                        />
                                        <div className='createPhoto-texts'>
                                            <div className='photo-text'>사진 첨부하기</div>
                                            <div className='photo-limit-text'>
                                                사진은 최대 10개 등록할 수 있습니다.</div>
                                        </div>
                                        <div className="photo-upload-button">
                                            <div className="add-picture">
                                                <img src={plus}></img>
                                            </div>
                                            <button className="register-button">
                                                <p>등록</p>
                                            </button> {/* 등록 버튼 */}
                                        </div>
                                        <div className="line1"></div>

                                    </>
                                )}
                            </div>

                            {/* 리뷰 필터란 */}
                            <div className='reviewFillter'>
                                <div className='reivewCount'>리뷰: 74</div>
                                <div className='fillter-date'>
                                    <div
                                        className={`fillter-recent ${activeFilter === 'recent' ? 'active' : ''}`}
                                        onClick={() => handleFilterClick('recent')}
                                    >
                                        - 최신순
                                    </div>
                                    <div
                                        className={`fillter-old ${activeFilter === 'old' ? 'active' : ''}`}
                                        onClick={() => handleFilterClick('old')}
                                    >
                                        - 오래된순
                                    </div>
                                </div>
                                <div className="checkbox-container">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}
                                        />
                                        리뷰 사진만
                                    </label>
                                </div>

                            </div>

                            {/* 리뷰들 */}
                            <div className="review_havePhoto5">
                                <div className="review-header">
                                    <div className="review-user-info" alt="유저 계정, 이미지+리뷰수+닉네임">
                                        <img className="user-avatar" src={reviewer} alt="계정 이미지" />
                                        <div className='user-nickname-level'>
                                            <div className="user-nickname">nickname1</div>
                                            <div className="user-level">사모예드 리뷰어 | 리뷰 114</div>
                                        </div>
                                    </div>
                                    <div className="review-rating-date">
                                        <div className="review-rating">
                                            <img src={star2} alt="Rating Star" /> 5점
                                        </div>
                                        <div className="review-date">2024.06.13</div>
                                    </div>

                                    <div className="review-content">
                                        강아지집, 방석, 장난감 등등 다 갖춰져 있고 커피머신, 에어프라이어에 얼음도 냉동실에 넉넉하게 얼려져 있어요! 사장님 부모 모두 친절하시고 친구들 모두 깨끗했어요. 조용하게 휴식 취하면서 댕댕이들 안전하게 놀 곳 찾으시는 분들께 강추합니다.
                                    </div>
                                    <div className="review-images">

                                        {/* {reviewImages.slice(0, 4).map((image, index) => (
                                    <img src={image} alt={`review-image${index + 1}`} key={index} />
                                ))}
                                {showMoreImages && reviewImages.slice(4).map((image, index) => (
                                    <img src={image} alt={`review-image${index + 5}`} key={index + 4} />
                                ))}
                                {reviewImages.length > 4 && (
                                    <div className="show-more-button" onClick={handleImageToggleClick}>
                                        {showMoreImages ? '숨기기' : '+ 더보기'} */}
                                        <img src={img1} alt="review-image1" />
                                        <img src={img1} alt="review-image2" />
                                        <img src={img1} alt="review-image3" />
                                        <img src={img1} alt="review-image4" />

                                        {showMoreImages && (
                                            <>
                                                <img src={img1} alt="review-image4" />
                                                <img src={img1} alt="review-image4" />
                                                <img src={img1} alt="review-image4" />
                                                <img src={img1} alt="review-image4" />
                                                <img src={img1} alt="review-image4" />
                                                <img src={img1} alt="review-image4" />
                                            </>
                                        )}

                                    </div>
                                    {/* 리뷰 더보기 토글 */}
                                    <div className="show-more-image" onClick={handleImageToggleClick}>
                                        {showMoreImages ? (
                                            <>
                                                리뷰 접기 <img src={up} alt="접기 아이콘" />
                                            </>
                                        ) : (
                                            <>
                                                리뷰 사진 더보기 <img src={down} alt="더보기 아이콘" />
                                            </>
                                        )}
                                    </div>

                                </div>
                                <div className="line1"></div>
                            </div>

                            {/* 리뷰 예시2 */}
                            <div className="review_havePhoto5">
                                <div className="review-header">
                                    <div className="review-user-info" alt="유저 계정, 이미지+리뷰수+닉네임">
                                        <img className="user-avatar" src={reviewer} alt="계정 이미지" />
                                        <div className='user-nickname-level'>
                                            <div className="user-nickname">nickname1</div>
                                            <div className="user-level">달마시안 리뷰어 | 리뷰 34</div>
                                        </div>
                                    </div>
                                    <div className="review-rating-date">
                                        <div className="review-rating">
                                            <img src={star2} alt="Rating Star" /> 3.5점
                                        </div>
                                        <div className="review-date">2024.06.11</div>
                                    </div>

                                    <div className="review-content">
                                        3개 사진 샘플이 어떤지 궁금했어
                                    </div>
                                    <div className="review-images">


                                        <img src={img1} alt="review-image1" />
                                        <img src={img1} alt="review-image2" />
                                        <img src={img1} alt="review-image3" />

                                    </div>

                                </div>
                                <div className="line1"></div>
                            </div>

                            <div className="review_NoPhoto">
                                <div className="review-header">
                                    <div className="review-user-info" alt="유저 계정, 이미지+리뷰수+닉네임">
                                        <img className="user-avatar" src={reviewer} alt="계정 이미지" />
                                        <div className='user-nickname-level'>
                                            <div className="user-nickname">nickname1</div>
                                            <div className="user-level">아기강아지 리뷰어 | 리뷰 14</div>
                                        </div>
                                    </div>
                                    <div className="review-rating-date">
                                        <div className="review-rating">
                                            <img src={star2} alt="Rating Star" /> 4.0점
                                        </div>
                                        <div className="review-date">2024.05.11</div>
                                    </div>
                                    <div />

                                    <div className="review-content">
                                        공간도 깔끔하고 필요한 건 다 있어요. 댕댕이랑 함께 잘 쉬다 갑니다!
                                    </div>
                                </div>

                            </div>
                            <div className="line1"></div>
                        </div>
                    )}

                </div>}
                {/* 탭의 사진, 4개씩 정렬 */}
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

                    {/* {activeTab === 'photo' && (
                    <div className="content3">
                        <div className="photoLists">
                            {postDetails.images.map((image, index) => (
                                <div key={index} className="photo-item">
                                    <img src={image} alt={`photo${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                )} */}
                    {/* 위의 식은 데이터가 없어 사용할 수 없음  */}
                </div>}
            </div>
        </div>
    );
};

export default PostDetail;