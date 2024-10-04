import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './PostDetail.css';
import defaultMemberImg from '../../images/default_pfp.png';
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
import plus from '../../images/plus.png';
import { getPostDetailAPI } from '../../apis/PostAPICalls';
import { addBookmarkAPI, removeBookmarkAPI } from '../../apis/BookmarkAPICalls';
import { addReviewAPI, getAverageRateByPostNo, getReviewsByPostNo, getMemberReviewCountAPI, putMemberReviewUpdate, deleteMemberReview, findNickname, findGrade, findImageByMemberNo } from '../../apis/ReviewAPICalls';
import { useNavigate } from 'react-router-dom';
import { findImageByImageNoAPI, deleteImageByImageNoAPI, updateImageByImageNoAPI } from "../../apis/ImagesAPICalls";


const PostDetail = () => {
    const { postNo } = useParams(); // URL에서 postNo를 가져옵니다.
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]); // 리뷰 저장할 state
    const [ratingAverage, setRatingAverage] = useState(null); // 평점 null로 설정
    const [reviewCount, setReviewCount] = useState(null); //  총 리뷰 수 상태
    
    const [memberReviewCounts, setMemberReviewCounts] = useState(0); // 멤버의 리뷰 수 
    const [memberInfo, setMemberInfo] = useState({});
    const [showMore, setShowMore] = useState(false); // '더보기' 상태 관리   

    //멤버 이미지를 저장할 상태
    const [memberImg, setmemberImg] = useState([]); // 


    // Tab 상태 추가
    const [activeTab, setActiveTab] = useState('info'); // 초기값은 'info'

    // Toggle 상태 추가
    const [showMoreInfo, setShowMoreInfo] = useState(false);

    // 북마크 별
    const [isStarClicked, setIsStarClicked] = useState(false);

    // 리뷰 4개이상 토글
    const [showMoreImages, setShowMoreImages] = useState(false);

    // 체크박스 리뷰사진만
    const [isChecked, setIsChecked] = useState(false); // Checkbox state

    // fillter 기능
    const [activeFilter, setActiveFilter] = useState('recent'); // 초기값은 'recent'

    // 리뷰 작성 및 별점 남기기
    const [rating, setRating] = useState(0); // 리뷰 평점 상태
    const [showInput, setShowInput] = useState(false); // 입력창 표시 상태
    const [reviewContent, setReviewContent] = useState(''); // 리뷰 내용 상태
    const [editingReviewNo, setEditingReviewNo] = useState(null); // 수정 중인 리뷰 번호


    // 리뷰 수정 시작
    const handleUpdate = (review) => {
        console.log("Updating review:", review); // 로그 추가
        setEditingReviewNo(review.reviewNo); // 수정할 리뷰 번호 설정
        setReviewContent(review.content); // 기존 리뷰 내용을 입력 필드에 표시
        setRating(review.rate); // 기존 별점 설정
    };

    // 수정 취소 함수
    const handleCancelEdit = (review) => {
        // 수정 모드 해제
        setEditingReviewNo(null);
        // 원래 리뷰 내용으로 되돌리기
        setReviewContent(review.content);
    };


    // 공유하기 
    const linkToShare = `http://localhost:3000/PostList/post/${postNo}`; // 공유할 링크
    const handleShare = () => {
        // 클립보드에 링크 복사
        navigator.clipboard.writeText(linkToShare).then(() => {
            alert('링크가 복사되었습니다! 복사한 링크로 공유하세요.');
        }).catch(err => {
            console.error('링크 복사 오류:', err);
        });
    };

    // 문의, 지도보기 navigate
    const navigate = useNavigate();
    const handleClickChat = () => {
        navigate('/chat');
    };
    const handleClickMap = () => {
        navigate('/select_location')
    }


    // post정보 받아오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('포스트 넘버:', postNo);
                const response = await getPostDetailAPI(postNo);

                if (response && response.results && response.results.post) {
                    setInfo(response.results.post);
                } else {
                    throw new Error('포스트 못불러옴');
                }
            } catch (error) {
                console.error('에러: ', error);
            } finally {
                setLoading(false);
            }
        };

        if (postNo) {
            fetchData();
        }
    }, [postNo]);



    //북마크 등록,삭제, 조회(상태확인)
    useEffect(() => {
        const memberNo = localStorage.getItem('memberNo');
        if (memberNo) {
            // 로컬 스토리지에 저장된 북마크 상태 확인
            const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
            const isBookmarked = bookmarks.includes(postNo); // postNo가 북마크 목록에 있는지 확인
            setIsStarClicked(isBookmarked); // 북마크 상태 설정
        }
    }, [postNo]);

    const handleStarClick = async () => {
        const memberNo = localStorage.getItem('memberNo');

        if (!memberNo) {
            alert('로그인 후 이용해주세요');
            return; // memberNo가 없으면 함수 종료
        }

        // memberNo가 있을 경우에만 isStarClicked 상태를 토글
        setIsStarClicked(prevState => !prevState); // Toggle 상태 변경

        const bookmarkInfo = {
            memberNo,
            postNo
        };

        try {
            if (!isStarClicked) {
                // 북마크 추가
                const response = await addBookmarkAPI(bookmarkInfo);
                console.log('북마크 추가');

                // 북마크가 추가되면 로컬 스토리지에 저장
                const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
                bookmarks.push(postNo);
                localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            } else {
                // 북마크 삭제
                const response = await removeBookmarkAPI(memberNo, postNo);
                console.log('북마크 삭제');

                // 북마크가 삭제되면 로컬 스토리지에서 제거
                let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
                bookmarks = bookmarks.filter(id => id !== postNo);
                localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            }
        } catch (error) {
            console.error('Error뜸: ', error);
        }
    };

    // 리뷰 불러오고 memberNo로 그 멤버의 리뷰수, 닉네임, 등급, member이미지 가져오기
    // postNo=> reviewNo 가져오고=> reviewNo와 연결된 memberNo 가져오기
    const fetchReviews = async () => {
        setLoading(true);
        try {
            const reviewData = await getReviewsByPostNo(postNo, { sortOrder: activeFilter /*정렬필터*/ });

            // 정렬(오래된순, 최신순)
            if (reviewData && reviewData.results) {
                const reviewsList = reviewData.results.reviews;
                const sortedReviews = [...reviewsList].sort((a, b) => {
                    return activeFilter === 'recent' ? b.reviewNo - a.reviewNo : a.reviewNo - b.reviewNo;
                });

                setReviews(sortedReviews);
                setReviewCount(reviewData.results.reviewCount);

                // memberNo들을 가져오기
                const memberNos = [...new Set(reviewsList.map(review => review.memberNo))];

                // memberData를 먼저 선언하고 초기화
                const memberData = await Promise.all(memberNos.map(async (memberNo) => {
                    const nicknameData = await findNickname(memberNo);
                    const gradeData = await findGrade(memberNo);
                    const reviewCountData = await getMemberReviewCountAPI(memberNo);
                    const memberImgData = await findImageByMemberNo(memberNo);
                    

                    return {
                        // null이거나 불러오지 못했을 때
                        memberNo,
                        nickname: nicknameData?.results?.nickname || 'Unknown',
                        grade: gradeData?.results?.grade || 'null',
                        reviewCount: reviewCountData?.results?.memberReviewCount || 0 ,
                        memberImg: memberImgData?.results?.image?.imageUrl || defaultMemberImg
                    };
                }));

                const memberInfoMap = {};
                memberData.forEach(({ memberNo, nickname, grade, reviewCount, memberImg }) => {
                    memberInfoMap[memberNo] = { nickname, grade, reviewCount, memberImg };
                });

                setMemberInfo(memberInfoMap);  // 상태에 저장
            }
        } catch (error) {
            console.error('리뷰 가져오기 오류:', error);
        } finally {
            setLoading(false);
        }
    };



    // 리뷰 등록
    const handleReviewSubmit = async () => {
        // 별점과 리뷰 내용이 비어있는지 체크
        if (rating === 0 || reviewContent.trim() === '') {
            alert('별점과 리뷰 내용을 작성해주세요.'); // 경고 메시지
            return; // 함수 종료
        }

        const memberNo = localStorage.getItem('memberNo'); // 로그인한 사용자 ID 가져오기
        if (memberNo === null) {
            alert('로그인 정보가 없습니다. 로그인해 주세요.');
            return;
        }

        const reviewData = {
            memberNo: memberNo, // 현재 로그인한 사용자 ID
            postNo: postNo,
            rate: rating, // 선택한 별점
            content: reviewContent // 리뷰 내용
        };

        try {
            await addReviewAPI(reviewData); // 리뷰 등록 API 호출
            alert('리뷰가 성공적으로 등록되었습니다.');

            // 리뷰 등록 후 즉시 평균 및 총 리뷰 수 가져오기
            await fetchAverageAndCount();

            // 등록한 리뷰의 memberNo로 리뷰 수를 업데이트
            const memberReviewCountData = await getMemberReviewCountAPI(memberNo);
            setMemberReviewCounts((prevCounts) => ({
                ...prevCounts,
                [memberNo]: memberReviewCountData?.results?.memberReviewCount || 0,
            }));

            // 리뷰 등록 후에도 해당 필터를 유지
            await fetchReviews();

            // 상태 초기화
            setRating(0);
            setReviewContent('');
            setShowInput(false);
        } catch (error) {
            console.error('리뷰 추가 에러:', error);
            alert('리뷰 등록에 실패했습니다.');
        }
    };

    // useEffect에서 fetchReviews 호출 => postNo가 바뀔때마다 리뷰 다시 불러옴
    useEffect(() => {
        if (postNo) {
            fetchReviews();
        }
    }, [postNo, activeFilter]); // Filter가 변경될 때마다 fetchReviews 호출





    // 리뷰 평균 평점, 리뷰 총계 가져오기
    const fetchAverageAndCount = async () => {
        setLoading(true);
        try {
            // 평균 평점 API 호출
            const averageResponse = await getAverageRateByPostNo(postNo);
            if (averageResponse && averageResponse.httpStatusCode === 200) {
                setRatingAverage(averageResponse.results);
            }

            // 리뷰 목록 API 호출
            const reviewsResponse = await getReviewsByPostNo(postNo);
            if (reviewsResponse && reviewsResponse.httpStatusCode === 200) {
                const results = reviewsResponse.results;
                if (Array.isArray(results.reviews)) {
                    setReviews(results.reviews);
                    setReviewCount(results.reviews.length);
                } else {
                    console.error('리뷰 응답 데이터의 형식이 잘못되었습니다:', results);
                    setReviewCount(0);
                }
            } else {
                console.error('리뷰 응답 데이터가 유효하지 않습니다:', reviewsResponse);
                setReviewCount(0);
            }
        } catch (error) {
            console.error('리뷰 및 평균 평점 로딩 에러:', error);
            setReviewCount(0);
        } finally {
            setLoading(false);
        }
    };

    // 컴포넌트가 마운트될 때 리뷰 평균 및 총계 가져오기
    useEffect(() => {
        fetchAverageAndCount();
    }, [postNo]);





    // 필터 클릭 핸들러
    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };


    // 필터 변경 시 정렬된 리뷰 업데이트
    // 리뷰 날짜
    const ReviewComponent = ({ review }) => {
        return (
            <div className="review-rating-date">
                <div className="review-rating">
                    <img src={star2} alt="Rating Star" /> {review.rate}점
                </div>
                <div className="review-date">
                    {formatReviewDate(review.createdDate)}
                </div>
            </div>
        );
    };

    // 작성 날짜 나오게하기
    const formatReviewDate = (createdDate) => {
        const [year, month, day, hour, minute] = createdDate;
        const date = new Date(year, month - 1, day, hour, minute);

        // 'YYYY.MM.DD HH:mm' 형식으로 반환
        return date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).replace(',', ''); // 쉼표 제거
    };


    // 리뷰 사진 4개일 때 토글 기능
    const handleImageToggleClick = () => {
        setShowMoreImages(!showMoreImages); // 이미지 추가/접기 토글
    };

    if (loading) return <div>리뷰 불러오는 중...</div>; // 로딩 중일 때 표시


    // 포스트 상세 정보 info로 통합
    const { fcltyNm, ctgryTwoNm, lnmAddr, telNo, hmpgUrl, operTime, parkngPosblAt, entrnPosblPetSizeValue, petLmttMtrCn, inPlaceAcpPosblAt, outPlaceAcpPosblAt } = info || {};

    // 현재 로그인한 사용자의 memberNo 일치해야함
    // 이걸로 localStroge의 memberNo로 수정, 삭제 버튼 활성화, 비활성화
    const currentMemberNo = Number(localStorage.getItem('memberNo'));

    // 리뷰 수정 완료
    const handleReviewUpdate = async () => {
        if (rating === 0 || reviewContent.trim() === '') {
            alert('별점과 리뷰 내용을 작성해주세요.');
            return;
        }

        try {
            const reviewData = {
                rate: rating,
                content: reviewContent,
            };

            // 리뷰 수정 API 호출
            const response = await putMemberReviewUpdate(editingReviewNo, reviewData);

            if (response?.results?.review) {
                alert('리뷰가 성공적으로 수정되었습니다.');

                // 리뷰 수정 후 상태 초기화
                setEditingReviewNo(null);
                setReviewContent('');
                setRating(0);
                setShowInput(false);

                // 수정된 리뷰 반영을 위해 최신 리뷰 목록을 가져옵니다.
                await fetchReviews();

                // 리뷰 수정 후 즉시 평균 및 총 리뷰 수 가져오기
                await fetchAverageAndCount();
            } else {
                alert('리뷰 수정에 실패했습니다.');
            }
        } catch (error) {
            console.error('리뷰 수정 에러:', error);
            alert('리뷰 수정에 실패했습니다.');
        }
    };




    // 삭제
    const handleDelete = async (reviewNo) => {
        // 로그인한 사용자 ID 가져오기
        const memberNo = localStorage.getItem('memberNo');

        try {
            const response = await deleteMemberReview(reviewNo);
            console.log(`리뷰 삭제 성공: ${response}`);
            const updatedReviews = reviews.filter(review => review.reviewNo !== reviewNo);
            setReviews(updatedReviews);

            // 삭제한 리뷰의 memberNo로 리뷰 수를 업데이트
            const memberReviewCountData = await getMemberReviewCountAPI(memberNo);
            setMemberReviewCounts((prevCounts) => ({
                ...prevCounts,
                [memberNo]: memberReviewCountData?.results?.memberReviewCount || 0,
            }));

            // 리뷰를 삭제한 후 fetchReviews를 호출하여 최신 리뷰를 가져옵니다.
            await fetchReviews();

            // 리뷰 삭제 후 즉시 평균 및 총 리뷰 수 가져오기
            await fetchAverageAndCount();

            // 상태 초기화
            setRating(0);
            setReviewContent('');
            setShowInput(false);
        } catch (error) {
            console.error(`리뷰 삭제 실패: ${error}`);
        }
    };


    // 탭을 클릭하면 해당 탭으로 변경(상세정보, 리뷰, 사진)
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    // 상세 정보 토글 함수
    const handleToggleClick = () => {
        setShowMoreInfo(!showMoreInfo);
    };

    // 사진 4번째 클릭시 포토로 가기
    const handleShowMoreClick = () => {
        handleTabClick('photo');
    };

    // 리뷰 필터 사진만 기능 체크박스
    const handleCheckboxChange = () => setIsChecked(!isChecked);

    // 리뷰 작성 별점
    const handleStarClick_review = (index) => {
        setRating(index); // 클릭된 별 개수로 상태 업데이트
        setShowInput(true); // 별 클릭 시 입력창 표시
    };


    if (loading) return <div>로딩 중...</div>;
    if (!info) return <div>정보가 없습니다.</div>;

    return (
        <div className="post-detail-container">
            {/* 이미지 섹션 */}
            <div className="post-images">
                <div className="photo-container">
                    {/* 이미지가 4개 이하일 때만 표시 */}
                    {/* {images.slice(0, showMore ? images.length : 3).map((img, index) => (
                        <img src={img} alt={`이미지 ${index + 1}`} key={index} />
                    ))} */}

                    {/* 4개째 사진에는 더보기 클릭 가능 */}
                    {/* {!showMore && images.length > 3 && (
                        <div className="show-more-button" onClick={handleShowMoreClick}>
                            + 더보기
                        </div>
                    )} */}
                </div>
            </div>

            <div className="post-info">
                <div className="post-info-left">
                    <div className="post-title-description">
                        <h1 className="post-title">{fcltyNm}</h1>
                        <p className="post-description">{ctgryTwoNm}</p>
                    </div>
                    <div className="post-rating-review">
                        <div className="post-rating">
                            ⭐ {ratingAverage !== null ? ratingAverage.toFixed(1) : '0'} 점
                        </div>
                        <div className="post-review-count">
                            방문자 리뷰 수: {reviewCount !== null ? reviewCount : '0'}
                        </div>
                    </div>
                </div>
                <div className="post-buttons">
                    <button className="post-button1" onClick={handleClickChat} >
                        <img src={chet} alt="문의 아이콘" /> 문의
                    </button>
                    <button className="post-button2" onClick={handleClickMap}>
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
                <div className="post-action-button" onClick={handleShare}>
                    <div>
                        <img src={sharing} alt="공유하기" />
                    </div>
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
                            {!editingReviewNo && (
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
                                                value={reviewContent}
                                                onChange={(e) => setReviewContent(e.target.value)}
                                            />
                                            <div className='createPhoto-texts'>
                                                <div className='photo-text'>사진 첨부하기</div>
                                                <div className='photo-limit-text'>
                                                    사진은 최대 10개 등록할 수 있습니다.
                                                </div>
                                            </div>
                                            <div className="photo-upload-button">
                                                <div className="add-picture">
                                                    <img src={plus} alt="Add" />
                                                </div>
                                                <button className="reviewRegister-button" onClick={handleReviewSubmit}>
                                                    등록
                                                </button>
                                            </div>


                                            <div className="line1"></div>

                                        </>
                                    )}
                                </div>
                            )}

                            {/* 리뷰 필터란 */}
                            <div className='reviewFillter'>
                                <div className='reivewCount'>리뷰: {reviewCount !== null ? reviewCount : '0'}</div>
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
                                <div className="review-checkbox-container">
                                    <label className="review-checkbox-label">
                                        <input
                                            type="checkbox"
                                            className="review-checkbox"
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}
                                        />
                                        <b />리뷰 사진만
                                    </label>
                                </div>

                            </div>

                            {/* 리뷰들 */}
                            <div className="review_lists">

                                {reviews.map((review) => (
                                    <div className='review_noN' key={review.reviewNo}>
                                        <div className="review-header">
                                            <div className="review-user-info" alt="유저 계정, 이미지+리뷰수+닉네임">
                                                <img src={memberInfo[review.memberNo]?.memberImg}  className="user-avatar" alt="멤버 프로필 사진"/>
                                                
                                                <div className='user-nickname-level'>
                                                    <div className="user-nickname">
                                                        {memberInfo[review.memberNo]?.nickname || 'Unknown'}
                                                    </div>
                                                    <div className="user-level">
                                                        {memberInfo[review.memberNo]?.grade || 'N/A'} 리뷰어 | 리뷰: {memberInfo[review.memberNo]?.reviewCount || 0}개
                                                    </div>
                                                </div>

                                                {currentMemberNo === Number(review.memberNo) && (
                                                    <div className='post-update-delete'>
                                                        {/* 수정 버튼 */}
                                                        <button className='post-update' onClick={() => handleUpdate(review)}>수정</button>
                                                        <button className='post-delete' onClick={() => handleDelete(review.reviewNo)}>삭제</button>
                                                    </div>
                                                )}

                                            </div>
                                            {/* 수정 중이 아닐 때만 별점과 날짜 표시 */}
                                            {editingReviewNo !== review.reviewNo && (
                                                <div className="review-rating-date">
                                                    <div className="review-rating">
                                                        <img src={star2} alt="Rating Star" /> {review.rate}점
                                                    </div>
                                                    <div className="review-date">{formatReviewDate(review.createdDate)}</div>
                                                </div>
                                            )}
                                            {/* 수정 중일 때 리뷰 입력창 표시 */}
                                            {editingReviewNo === review.reviewNo ? (
                                                <>
                                                    <div className='reviewUpdate-div'>
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
                                                        <input
                                                            type="text"
                                                            placeholder="리뷰 내용을 수정하세요"
                                                            className="review-input"
                                                            value={reviewContent}
                                                            onChange={(e) => setReviewContent(e.target.value)}
                                                        />
                                                        <div className='createPhoto-texts'>
                                                            <div className='photo-text'>사진 첨부하기</div>
                                                            <div className='photo-limit-text'>
                                                                사진은 최대 10개 등록할 수 있습니다.
                                                            </div>
                                                        </div>
                                                        <div className="photo-upload-button">
                                                            <div className="add-picture">
                                                                <img src={plus} alt="Add" />
                                                            </div>
                                                            <button className="updateRegister-button1" onClick={handleCancelEdit}>
                                                                <p>수정 취소</p>
                                                            </button>
                                                            <button className="updateRegister-button2" onClick={handleReviewUpdate}>
                                                                <p>수정 완료</p>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="review-content">{review.content}</div>
                                            )}
                                        </div>
                                        <div className="line5"></div>
                                    </div>
                                ))}


                            </div>


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
                </div>}
            </div>
        </div>
    );
};

export default PostDetail;