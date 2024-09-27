import "../AdminMenu.css"
import SearchIcon from "../../../images/Search.png"
import { useState } from "react";

// 포인트 리스트
function PointList() {

    const [searchMember, setSearchMember] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortPoint, setSortPoint] = useState("desc"); // "asc" 또는 "desc"로 초기화
    const [exitMember, setExitMember] = useState(false); // 탈퇴회원 제외 상태

    const members = [
        { id: 1, name: "이득규", nickname: "사마규", grade: "새싹리뷰어", status: "활동중", category: "일반회원", point: 10 },
        { id: 2, name: "홍주연", nickname: "불곰", grade: "새싹리뷰어", status: "활동중", category: "관리자", point: 10 },
        { id: 3, name: "이의정", nickname: "마멋", grade: "새싹리뷰어", status: "활동중", category: "관리자", point: 20 },
        { id: 4, name: "배하은", nickname: "민달팽이", grade: "새싹리뷰어", status: "활동정지", category: "일반회원", point: 40 },
        { id: 5, name: "이규섭", nickname: "나무늘보", grade: "새싹리뷰어", status: "활동정지", category: "일반회원", point: 60 }
    ]

    const filteredMembers = members.filter(member =>
        member.name.includes(searchMember) || member.nickname.includes(searchMember)
    );

    // 탈퇴회원 제외 처리
    const visibleMembers = exitMember
        ? filteredMembers.filter(member => member.status !== "활동정지")
        : filteredMembers;

    // 정렬 처리
    const sortedMembers = visibleMembers.sort((a, b) => {
        if (sortPoint === "asc") {
            return a.point - b.point;
        } else {
            return b.point - a.point;
        }
    });

    const indexOfLastMember = currentPage * 5;
    const indexOfFirstMember = indexOfLastMember - 5;
    const currentMembers = sortedMembers.slice(indexOfFirstMember, indexOfLastMember);

    const handleSearchChange = (e) => {
        setSearchMember(e.target.value);
        setCurrentPage(1); // 검색할때 페이지를 1로 리셋
    };

    const handleSortChange = (order) => {
        setSortPoint(order);
        setCurrentPage(1);
    };

    const handleExitMemberChange = () => {
        setExitMember(prev => !prev);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(sortedMembers.length / 5);

    return(
        <div className="member-line">
            <h1 className="member-search">회원 조회</h1>

            <form className="member-search-box" onSubmit={(e) => e.preventDefault()}>
                <input 
                    className="member-search-text"
                    type="text"
                    placeholder="회원명 또는 닉네임 입력"
                    value={searchMember}
                    onChange={handleSearchChange}
                />
                <button className="member-search-button" type="submit">
                    <img className="member-search-button-img" src={SearchIcon}/>
                </button>

            <label className="point-top">
            <input 
                type="radio"
                name="check"
                checked={sortPoint === "desc"}
                onChange={() => handleSortChange("desc")}
                />포인트 많은순
            </label>

            <label className="point-down">
            <input 
                type="radio"
                name="check"
                checked={sortPoint === "asc"}
                onChange={() => handleSortChange("asc")}
                />포인트 적은순
            </label>

            <label className="exit-member">
                <input
                type="checkbox"
                checked={exitMember}
                onChange={handleExitMemberChange}
                />탈퇴회원 제외
            </label>
            
            </form>

            
            <table className="member-search-table">
                <thead>
                <tr>
                    <th>회원번호</th>
                    <th>이름</th>
                    <th>닉네임</th>
                    <th>회원등급</th>
                    <th>회원상태</th>
                    <th>회원분류</th>
                    <th>포인트</th>
                </tr>
                </thead>

                <tbody>
                    {currentMembers.length > 0 ? (
                        currentMembers.map(member => (
                            <tr key={member.id}>
                                <td>{member.id}</td>
                                <td>{member.name}</td>
                                <td>{member.nickname}</td>
                                <td>{member.grade}</td>
                                <td>{member.status}</td>
                                <td>{member.category}</td>
                                <td>{member.point}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">검색 결과가 없습니다.</td>
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

export default PointList;