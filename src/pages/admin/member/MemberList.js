import "../AdminMenu.css";
import SearchIcon from "../../../images/Search.png";
import { useState, useEffect } from "react";
import { getMemberList } from "../../../apis/MemberAPICalls";

// 회원 조회 리스트
function MemberList() {
    const [searchMember, setSearchMember] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortType, setSortType] = useState("joinDateDesc"); 
    const [exitMember, setExitMember] = useState(false); 
    const [members, setMembers] = useState([]); 

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await getMemberList();
                setMembers(response.results.members);
            } catch (error) {
                console.error("Error fetching members:", error);
            }
        };

        fetchMembers();
    }, []);

    const filteredMembers = members.filter(member =>
        member.memberName.includes(searchMember) || member.memberNickname.includes(searchMember)
    );

    // 탈퇴회원 제외 처리
    const visibleMembers = exitMember
        ? filteredMembers.filter(member => member.status == "ACTIVATED")
        : filteredMembers;

    // 정렬 처리
    const sortedMembers = visibleMembers.sort((a, b) => {
        if (sortType === "joinDateAsc") {
            return new Date(a.createdDate) - new Date(b.createdDate);
        } else if (sortType === "joinDateDesc") {
            return new Date(b.createdDate) - new Date(a.createdDate);
        } else if (sortType === "idAsc") {
            return a.memberNo - b.memberNo;
        } else if (sortType === "idDesc") {
            return b.memberNo - a.memberNo;
        }
        return 0;
    });

    const indexOfLastMember = currentPage * 5;
    const indexOfFirstMember = indexOfLastMember - 5;
    const currentMembers = sortedMembers.slice(indexOfFirstMember, indexOfLastMember);

    const handleSearchChange = (e) => {
        setSearchMember(e.target.value);
        setCurrentPage(1); 
    };

    const handleSortChange = (type) => {
        setSortType(type);
        setCurrentPage(1);
    };

    const handleExitMemberChange = () => {
        setExitMember(prev => !prev);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(sortedMembers.length / 5);

    return (
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
                    <img className="member-search-button-img" src={SearchIcon} />
                </button>

                <label className="member-number-down">
                    <input
                        type="radio"
                        name="check"
                        checked={sortType === "idAsc"}
                        onChange={() => handleSortChange("idAsc")}
                    />이전 가입순
                </label>

                <label className="member-number-up">
                    <input
                        type="radio"
                        name="check"
                        checked={sortType === "idDesc"}
                        onChange={() => handleSortChange("idDesc")}
                    />신규 가입순
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
                        <th>가입일</th>
                    </tr>
                </thead>

                <tbody>
                    {currentMembers.length > 0 ? (
                        currentMembers.map(member => (
                            <tr key={member.memberNo}>
                                <td>{member.memberNo}</td>
                                <td>{member.memberName}</td>
                                <td>{member.memberNickname}</td>
                                <td>{member.grade}</td>
                                <td>{member.status}</td>
                                <td>{member.memberRole}</td>
                                <td>{new Date(...member.createdDate).toLocaleDateString()}</td> 
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
    );
}

export default MemberList;
