import "../AdminMenu.css"
import SearchIcon from "../../../images/Search.png"
import { useState } from "react";

// 등록 신청 업체 리스트, 검색
function AppliedList() {

    const [searchMember, setSearchMember] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortDate, setSortDate] = useState("desc"); // "asc" 또는 "desc"로 초기화

    const businesses = [
        { id: 111, name: "강아지대통령", address: "서울시 강남구 삼성동 145-9", category: "식당-카페", views: "325", createdate: "2024-08-10" },
        { id: 112, name: "강아지아이들", address: "서울시 강남구 성북동 936", category: "반려동물 서비스", views: "310", createdate: "2024-06-22" },
        { id: 113, name: "강남강아지", address: "서울시 강남구 역삼동 724-45", category: "문화시설", views: "270", createdate: "2024-07-02" },
        { id: 114, name: "강남똥개", address: "서울시 강남구 대치동 906-15", category: "식당-카페", views: "256", createdate: "2024-05-30" }
    ]

    // 필터링
    const filteredBusinesses = businesses.filter(member =>
        member.name.includes(searchMember)
    );

    // 정렬 처리
    const sortedBusiness = filteredBusinesses.sort((a, b) => {
        if (sortDate === "asc") {
            return new Date(a.createdate) - new Date(b.createdate);
        } else {
            return new Date(b.createdate) - new Date(a.createdate);
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

    return(
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
                    <img className="member-search-button-img" src={SearchIcon}/>
                </button>

            <label className="new-soon">
            <input
                type="radio"
                name="check"
                checked={sortDate === "desc"}
                onChange={() => handleSortChange("desc")}
                />최신순
            </label>

            <label className="old-soon">
            <input
                type="radio"
                name="check"
                checked={sortDate === "asc"}
                onChange={() => handleSortChange("asc")}
                />오래된순
            </label>
            
            </form>

            
            <table className="member-search-table">
                <thead>
                <tr>
                    <th>업체번호</th>
                    <th>장소명</th>
                    <th>주소</th>
                    <th>카테고리</th>
                    <th>조회수</th>
                    <th>등록신청일</th>
                </tr>
                </thead>

                <tbody>
                {currentBusinesses.length > 0 ? (
                        currentBusinesses.map(member => (
                            <tr key={member.id}>
                                <td>{member.id}</td>
                                <td>{member.name}</td>
                                <td>{member.address}</td>
                                <td>{member.category}</td>
                                <td>{member.views}</td>
                                <td>{member.createdate}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">검색 결과가 없습니다.</td>
                        </tr>
                    )}
                </tbody>

            </table>
            
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <a
                        key={index + 1}
                        className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </a>
                ))}
                <a className="previous-page" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>이전 페이지</a>
                <a className="next-page" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>다음 페이지</a>
            </div>

        </div>
        
    )
}

export default AppliedList;