import "../AdminMenu.css";
import SearchIcon from "../../../images/Search.png";
import { useState, useEffect } from "react";
import { getPostAwaitingListAPI } from "../../../apis/PostRegisterAPICalls";
import { useNavigate } from "react-router-dom"; // React Router에서 useNavigate 사용

// 등록 신청 업체 리스트, 검색
function AppliedList() {
    const [searchMember, setSearchMember] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortDate, setSortDate] = useState("desc"); // "asc" 또는 "desc"로 초기화
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // useNavigate Hook 사용

    // API 호출로 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getPostAwaitingListAPI(); // API 호출
                const postList = response.results.postList; // postList 데이터 추출
                setBusinesses(postList); // 상태 업데이트
            } catch (error) {
                console.error("데이터 불러오기 에러: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // 날짜 포맷팅 함수
    const formatDate = (dateArray) => {
        if (!Array.isArray(dateArray) || dateArray.length < 5) {
            return "N/A"; // 날짜가 유효하지 않으면 N/A 반환
        }
        
        const [year, month, day, hour, minute] = dateArray;
        return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
    };

    // 필터링
    const filteredBusinesses = businesses.filter((business) =>
        business.fcltyNm.includes(searchMember)
    );

    // 정렬 처리 (postNo 기준)
    const sortedBusiness = filteredBusinesses.sort((a, b) => {
        if (sortDate === "asc") {
            return a.postNo - b.postNo; // 오래된 순
        } else {
            return b.postNo - a.postNo; // 최신순
        }
    });

    const handleSearchChange = (e) => {
        setSearchMember(e.target.value);
        setCurrentPage(1); // 검색 시 페이지를 1로 리셋
    };

    const handleSortChange = (order) => {
        setSortDate(order);
        setCurrentPage(1);
    };

    const indexOfLastBusiness = currentPage * 5;
    const indexOfFirstBusiness = indexOfLastBusiness - 5;
    const currentBusinesses = sortedBusiness.slice(indexOfFirstBusiness, indexOfLastBusiness);

    const totalPages = Math.ceil(sortedBusiness.length / 5);

    // 행 클릭 시 해당 postNo로 상세 페이지 이동
    const handleRowClick = (postNo) => {
        navigate(`/member_list/apply_detail/${postNo}`);
    };

    return (
        <div className="member-line">
            <h1 className="member-search">등록 신청 업체</h1>

            <form className="member-search-box" onSubmit={(e) => e.preventDefault()}>
                <input
                    className="member-search-text"
                    type="text"
                    placeholder="업체명 입력"
                    value={searchMember}
                    onChange={handleSearchChange}
                />
                <button className="member-search-button" type="submit">
                    <img className="member-search-button-img" src={SearchIcon} />
                </button>

                <label className="new-soon">
                    <input
                        type="radio"
                        name="check"
                        checked={sortDate === "desc"}
                        onChange={() => handleSortChange("desc")}
                    />
                    최신순
                </label>

                <label className="old-soon">
                    <input
                        type="radio"
                        name="check"
                        checked={sortDate === "asc"}
                        onChange={() => handleSortChange("asc")}
                    />
                    오래된순
                </label>
            </form>

            {loading ? (
                <p>로딩 중...</p>
            ) : (
                <table className="member-search-table">
                    <thead>
                        <tr>
                            <th>업체번호</th>
                            <th>장소명</th>
                            <th>주소</th>
                            <th>카테고리</th>
                            <th>신청상태</th>
                            <th>등록신청일</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentBusinesses.length > 0 ? (
                            currentBusinesses.map((business) => (
                                <tr key={business.postNo} onClick={() => handleRowClick(business.postNo)}>
                                    <td>{business.postNo}</td>
                                    <td>{business.fcltyNm}</td>
                                    <td>{business.roadNm}</td>
                                    <td>{business.ctgryTwoNm}</td>
                                    <td>{business.status}</td>
                                    {/* 날짜를 변환하여 표시 */}
                                    <td>{formatDate(business.createdDate)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">검색 결과가 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <a
                        key={index + 1}
                        className={`page-number ${currentPage === index + 1 ? "active" : ""}`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </a>
                ))}
                <a
                    className="previous-page"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                    이전 페이지
                </a>
                <a
                    className="next-page"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                    다음 페이지
                </a>
            </div>
        </div>
    );
}

export default AppliedList;