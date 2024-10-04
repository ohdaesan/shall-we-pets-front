import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import marking from '../../images/marking.png';
import img1 from '../../images/2 2.png';
import defPostImg from '../../images/post_def_pic.png';
import Dropdown from 'react-bootstrap/Dropdown';
import SearchIcon from "../../images/Search.png"
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
import { getPostsByCategoryAndCityAndSignguAPI, getPostsByCategoryAndCityAPI, getSignguByCategoryAndCityAPI } from '../../apis/PostAPICalls';
import { getImagesByPostNoAPI } from '../../apis/ImagesAPICalls';

function PostListForm() {
    const location = useLocation();

    // URL 쿼리 파라미터에서 'city'와 'category' 값을 추출
    const queryParams = new URLSearchParams(location.search);
    const city = decodeURIComponent(queryParams.get('city'));
    const ctgry = decodeURIComponent(queryParams.get('category'));

    let category = "";

    if (ctgry === "식당-카페") {
        category = "반려동물식당카페";
    } else if (ctgry === "동반 여행") {
        category = "반려동반여행";
    } else if (ctgry === "애완 병원") {
        category = "반려의료";
    } else if (ctgry === "문화시설") {
        category = "반려문화시설";
    }

    const [posts, setPosts] = useState([]);
    
    const [signgus, setSigngus] = useState([]);
    const [selectedSigngu, setSelectedSigngu] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');

    const [postImages, setPostImages] = useState({});
    
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    const postsRef = useRef(null);

    const cityImages = {
        '서울': Seoul,
        '제주': Jeju,
        '강원': Gang,
        '경기, 인천': GI,
        '경상, 부산, 울산, 대구': GBUD,
        '충청, 대전, 세종': CDS,
        '전라, 광주': ZG
    };

    const cityPhoto = cityImages[city] || Seoul;

    const loadPosts = async () => { // 페이징 처리 (10개 씩 로드)
        if (loading || !hasMore) return;
        setLoading(true);
        
        try {
            let response = null;
            console.log("포스트 페이지 ", currentPage);

            if (selectedSigngu === '' && searchKeyword === '') {
                response = await getPostsByCategoryAndCityAPI(category, city, currentPage);
            } else if (selectedSigngu !== '' && searchKeyword === '') { // 시군구 필터링
                response = await getPostsByCategoryAndCityAndSignguAPI(category, city, selectedSigngu, currentPage);
            } else if (selectedSigngu === '' && searchKeyword !== '') {
                // console.log("searchKeyword: ", searchKeyword);
                
            } 
            // else {

            // }

            console.log("response: ", response);

            if (response?.results?.posts?.length > 0) {
                setPosts(prevPosts => [...prevPosts, ...response.results.posts]);
                setCurrentPage(prevPage => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('장소 목록 가져오기 실패: ', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSigngu = async () => {
        try {
            const response = await getSignguByCategoryAndCityAPI(category, city);

            const sortedSigngus = response.results.signguList.sort((a, b) => a.localeCompare(b, 'ko'));
            setSigngus(sortedSigngus);
        } catch (error) {
            console.error('시군구 필터 가져오기 실패: ', error);
        }
        // finally {
        //     setLoading(false);
        // }
    };
    
    const fetchImages = async (postNo) => {
        try {
            let limit = 5;
            const response = await getImagesByPostNoAPI(postNo, limit);

            if (response?.results?.imageList) {
                setPostImages(prev => ({
                    ...prev,
                    [postNo]: response.results.imageList || []
                }));

                console.log(postImages);
            }
        } catch (error) {
            console.error("이미지 가져오기 실패: ", error);
        }
    };

    useEffect(() => {
        // loadPosts();
        fetchSigngu();
    }, []);

    useEffect(() => {
        setCurrentPage(0);
        setPosts([]);
        setHasMore(true);
    }, [selectedSigngu]);

    useEffect(() => {
        if(currentPage === 0) {
            setHasMore(true);
            loadPosts();
        }
    }, [currentPage]);

    // useEffect(() => {
        // TODO: 무한 스크롤로 변경

        // const fetchAllImages = async () => {
        //     const imageFetchPromises = posts.map(post => fetchImages(post.postNo));
        //     await Promise.all(imageFetchPromises);
        // };
    
        // if (posts.length > 0) {
        //     fetchAllImages();
        // }
    // }, [posts]);

    const handleScroll = () => {
        if (postsRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = postsRef.current;
            if (scrollHeight - scrollTop <= clientHeight + 500 && hasMore) {
                loadPosts();
            }
        }
    };

    useEffect(() => {
        const currentWrapper = postsRef.current;
        if (currentWrapper) {
            currentWrapper.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (currentWrapper) {
                currentWrapper.removeEventListener('scroll', handleScroll);
            }
        };
    }, [loading, hasMore]);

    return (
        <>
            <div className='content-postList-1'>
                <div className='listContentHeader'>
                    <div className='left-section'>
                        <div className='seletedCity'>
                            <img src={marking} alt="Marking" />
                            <div className='cityName'>{city}</div>
                        </div>
                        <div className='selected-category'>{ctgry}</div>
                        <div className='select-detail-location'>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {selectedSigngu === '' ? '지역선택 (시,군,구)' : selectedSigngu}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {signgus.map((signgu, index) => (
                                        <Dropdown.Item 
                                            key={index} 
                                            onClick={() => setSelectedSigngu(prev => prev === signgu ? '' : signgu)}
                                            className={selectedSigngu === signgu ? 'selected' : ''}
                                        >
                                            {signgu}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className='selected-city-photo'>
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
                    <button className="post-search-button" type="button" onClick={() => loadPosts()}>
                        <img className="post-search-button-img" src={SearchIcon}/>
                    </button>
                </div>

                <div className='posts-wrapper'>
                    <div className='posts' ref={postsRef}>
                        {posts.length > 0 ? (
                            posts.map(post => (
                                <div key={post.postNo} className='post'>
                                    <div>
                                        <div className='listInfo-details'>
                                            <div className='listInfo-name'>{post.fcltyNm}</div>
                                            <div className='listInfo-category'>{post.ctgryThreeNm}</div>
                                        </div>
                                        
                                        <div className='listInfo-address'>{post.rdnmadrNm ? post.rdnmadrNm : post.lnmAddr}</div> {/* 도로명 주소가 없으면 일반 주소로 보여주기 */}
                                    </div>

                                    <div className='listInfo-images'>
                                        <img src={defPostImg} alt="Image 1" />
                                    </div>
                                    
                                    {/* <div className='listInfo-images'>
                                        {postImages[post.postNo]?.length > 0 ? (
                                            postImages[post.postNo].map((image, index) => (
                                                <img key={index} src={image.url} alt={`Post Image ${index + 1}`} />
                                            ))
                                        ) : (
                                            <img src={defPostImg} alt="Default" />
                                        )}
                                    </div> */}
                                </div>
                            ))
                        ) : ( <div>해당 도시에 등록된 장소가 없습니다.</div> )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PostListForm;