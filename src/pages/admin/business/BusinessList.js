import "../AdminMenu.css"
import SearchIcon from "../../../images/Search.png"
import React, { useState, useEffect, useRef } from 'react';
import { getPostsByCategoryAndCitiesAdminAPI } from "../../../apis/PostAPICalls";

// 업체 리스트, 검색
function BusinessList() {
    const [searchBusiness, setSearchBusiness] = useState("");
    const [sortViews, setSortViews] = useState("views"); // 기본 정렬 : 조회수
    const [approvalFilter, setApprovalFilter] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState("") // 카테고리 필터
    const [locationFilter, setLocationFilter] = useState("") // 위치 필터

    const [posts, setPosts] = useState([]);

    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    const postsRef = useRef(null);

    // const businesses = [
    //     { name: "강아지대통령", address: "서울시 강남구 삼성동 145-9", category: "반려동물 서비스", approval: "승인", views: 500 },
    //     { name: "강아지아이들", address: "서울시 강남구 성북동 936", category: "반려동물 서비스", approval: "반려", views: 450 },
    //     { name: "강남강아지", address: "서울시 강남구 역삼동 724-45", category: "문화시설", approval: "승인 대기", views: 400 },
    //     { name: "강남강아지", address: "서울시 강남구 역삼동 724-45", category: "문화시설", approval: "승인 대기", views: 400 },
    //     { name: "강남강아지", address: "서울시 강남구 역삼동 724-45", category: "문화시설", approval: "승인 대기", views: 400 },
    //     { name: "강남강아지", address: "서울시 강남구 역삼동 724-45", category: "문화시설", approval: "승인 대기", views: 400 },
    //     { name: "강남강아지", address: "서울시 강남구 역삼동 724-45", category: "문화시설", approval: "승인 대기", views: 400 },
    //     { name: "강남강아지", address: "서울시 강남구 역삼동 724-45", category: "문화시설", approval: "승인 대기", views: 400 },
    //     { name: "강남강아지", address: "서울시 강남구 역삼동 724-45", category: "문화시설", approval: "승인 대기", views: 400 },
    //     { name: "강남강아지", address: "서울시 강남구 역삼동 724-45", category: "문화시설", approval: "승인 대기", views: 400 },
    //     { name: "강남강아지", address: "서울시 강남구 역삼동 724-45", category: "문화시설", approval: "승인 대기", views: 400 },
    //     { name: "강남똥개", address: "서울시 강남구 대치동 906-15", category: "식당-카페", approval: "승인", views: 350 }
    // ];

    const loadPosts = async () => { // 페이징 처리 (10개씩 로드)
        if (loading || !hasMore) return;
        setLoading(true);
        
        try {
            let response = await getPostsByCategoryAndCitiesAdminAPI(currentPage);

            console.log(response);
            

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

    useEffect(() => {
        if(currentPage === 0) {
            setHasMore(true);
            loadPosts();
        }
    }, [currentPage]);

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

    const handleSearchChange = (e) => {
        setSearchBusiness(e.target.value);
        setCurrentPage(1); // 검색 시 페이지를 1로 리셋
    };

    const handleApprovalChange = (e) => {
        const value = e.target.value;
        setApprovalFilter(prev =>
            prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
        setCurrentPage(1); // 필터링 시 페이지를 1로 리셋
    };

    const handleCategoryChange = (e) => {
        setCategoryFilter(e.target.value);
        setCurrentPage(1);
    };

    const handleLocationChange = (e) => {
        setLocationFilter(e.target.value);
        setCurrentPage(1);
    };

    // 검색 필터링
    // const filteredBusinesses = businesses.filter(business =>
    //     business.name.includes(searchBusiness) &&
    //     (approvalFilter.length === 0 || approvalFilter.includes(business.approval)) &&
    //     (categoryFilter === "" || business.category === categoryFilter) &&
    //     (locationFilter === "" || business.address.includes(locationFilter)) // 위치 필터링
    // );

    // 정렬 처리
    // const sortedBusiness = filteredBusinesses.sort((a, b) => {
    //     if (sortViews === "views") {
    //         return b.views - a.views; // 조회수 높은순
    //     } else if (sortViews === "viewsAsc") {
    //         return a.views - b.views; // 조회수 낮은순
    //     } else {
    //         return a.approval.localeCompare(b.approval); // 승인 상태로 정렬
    //     }
    // });

    // 페이지네이션
    // const indexOfLastBusiness = currentPage * 5;
    // const indexOfFirstBusiness = indexOfLastBusiness - 5;
    // // const currentBusinesses = sortedBusiness.slice(indexOfFirstBusiness, indexOfLastBusiness);
    // const currentBusinesses = sortedBusiness;

    // const totalPages = Math.ceil(filteredBusinesses.length / 5);

    return(
        <div className="member-line">
            <h1 className="member-search">업체 조회</h1>

            <form className="member-search-box" onSubmit={(e) => e.preventDefault()}>
                <input
                className="member-search-text"
                type="text"
                placeholder="업체명 입력"
                value={searchBusiness}
                onChange={handleSearchChange}
                />
                <button className="member-search-button" type="submit">
                    <img className="member-search-button-img" src={SearchIcon}/>
                </button>

                <label className="business-list-category">카테고리</label>
                <select className="business-list-category-choice" onChange={handleCategoryChange}>
                    <option value="">카테고리 선택</option>
                    <option value="반려동물 서비스">반려동물 서비스</option>
                    <option value="식당-카페">식당-카페</option>
                    <option value="동반 여행">동반 여행</option>
                    <option value="문화시설">문화시설</option>
                    <option value="애완병원">애완병원</option>
                </select>

                <label className="business-list-location">위치</label>
                <select className="business-list-location-choice" onChange={handleLocationChange}>
                    <option value="">지역 선택</option>
                    <option value="서울">서울</option>
                    <option value="경기,인천">경기,인천</option>
                    <option value="강원">강원</option>
                    <option value="충청,대전,세종">충청,대전,세종</option>
                    <option value="전라,광주">전라,광주</option>
                    <option value="경상,부산,울산,대구">경상,부산,울산,대구</option>
                    <option value="제주">제주</option>
                </select>

                <select className="business-list-location-sigungu" onChange={handleLocationChange}>
                    <option value="">장소 선택(시,군,구)</option>
                    <option value="강남구">강남구</option>
                    <option value="강동구">강동구</option>
                    <option value="강북구">강북구</option>
                    <option value="강서구">강서구</option>
                    <option value="관악구">관악구</option>
                    <option value="광진구">광진구</option>
                </select>

                <label className="search-high-soon">
                <input
                    type="radio"
                    name="check"
                    value="views"
                    checked={sortViews === "views"}
                    onChange={() => setSortViews("views")}
                    /> 조회수 높은순
                </label>

                <label className="search-row-soon">
                <input
                    type="radio"
                    name="check"
                    value="viewsAsc"
                    checked={sortViews === "viewsAsc"}
                    onChange={() => setSortViews("viewsAsc")}
                    /> 조회수 낮은순
                </label>

                <label className="ok">
                    <input
                        type="checkbox"
                        value="승인"
                        checked={approvalFilter.includes("승인")}
                        onChange={handleApprovalChange}
                        /> 승인
                </label>

                <label className="out">
                    <input
                        type="checkbox"
                        value="반려"
                        checked={approvalFilter.includes("반려")}
                        onChange={handleApprovalChange}
                        /> 반려
                </label>

                <label className="ok-wait">
                    <input
                        type="checkbox"
                        value="승인 대기"
                        checked={approvalFilter.includes("승인 대기")}
                        onChange={handleApprovalChange}
                    /> 승인 대기
                </label>
            </form>

            <div className="business-table-container">
                <table className="business-search-table">
                    <thead>
                        <tr>
                            <th>업체명</th>
                            <th style={{width: "390px"}}>주소</th>
                            <th>카테고리</th>
                            <th>승인여부</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody className="scrollable-tbody" ref={postsRef}>
                        {posts.length > 0 ? (
                            posts.map((business, index) => (
                                <tr key={index}>
                                    <td>{business.fcltyNm}</td>
                                    <td style={{width: "400px"}}>{business.rdnmadrNm ? business.rdnmadrNm : business.lnmAddr}</td>
                                    <td>{business.ctgryTwoNm}</td>
                                    <td>{business.status}</td>
                                    <td>{business.viewCount}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">검색 결과가 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* <div className="pagination">
                <a className="previous-page" href="#" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>이전 페이지</a>
                {Array.from({ length: totalPages }, (_, index) => (
                    <a
                        key={index + 1}
                        className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </a>
                ))}
                <a className="next-page" href="#" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>다음 페이지</a>
            </div> */}
        </div>
    )
}
export default BusinessList;