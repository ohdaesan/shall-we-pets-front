import "../AdminMenu.css";
import SearchIcon from "../../../images/Search.png";
import { useEffect, useState } from "react";
import { getMemberList } from "../../../apis/MemberAPICalls";
import { getMemberPointsAPI } from "../../../apis/PointAPI";
import { useNavigate } from 'react-router-dom';

// 포인트 리스트
function PointList() {
    const [searchMember, setSearchMember] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortPoint, setSortPoint] = useState("desc"); // "asc" 또는 "desc"로 초기화
    const [exitMember, setExitMember] = useState(false); // 탈퇴회원 제외 상태
    const [members, setMembers] = useState([]); // 회원 목록 상태
    const [loading, setLoading] = useState(true); // 로딩 상태

    // API로부터 회원 정보를 불러오기
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                // 회원 목록 조회
                const response = await getMemberList();
                const fetchedMembers = response.results.members;


                // 회원별 포인트 조회 후 members 상태에 저장
                const membersWithPoints = await Promise.all(
                    fetchedMembers.map(async (member) => {

                        try {
                            const pointsResponse = await getMemberPointsAPI(member.memberNo);

                            // 응답에서 totalPoints 값을 가져옴
                            const points = pointsResponse?.results?.totalPoints ?? 0;

                            return {
                                ...member,
                                point: points
                            };
                        } catch (pointsError) {
                            console.error(`회원번호 ${member.memberNo}의 포인트를 불러오는 중 오류 발생:`, pointsError);
                            return {
                                ...member,
                                point: 0 // 포인트 조회 실패 시 0으로 대체
                            };
                        }

                    })
                );

                console.log("최종 멤버 리스트:", membersWithPoints);

                setMembers(membersWithPoints);
                setLoading(false);
            } catch (error) {
                console.error("회원 정보를 불러오는 중 오류 발생:", error);
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);


    const navigate = useNavigate(); // useNavigate 훅 사용

    // 각 회원의 tr을 클릭했을 때 호출되는 함수
    const handleRowClick = (memberNo) => {
        navigate(`/point_list/${memberNo}`); // URL에 memberNo를 포함하여 이동
    };

    // 회원 검색 필터링
    const filteredMembers = members.filter(
        (member) =>
            member.memberName.includes(searchMember) ||
            member.memberNickname.includes(searchMember)
    );

    // 탈퇴회원 제외 처리
    const visibleMembers = exitMember
        ? filteredMembers.filter((member) => member.status === "ACTIVATED")
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
        setExitMember((prev) => !prev);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(sortedMembers.length / 5);

    if (loading) {
        return <p>로딩 중...</p>; // 로딩 중인 경우 표시
    }

    return (
        <div className="member-line">
            <h1 className="member-search">회원 포인트 조회</h1>

            <form className="member-search-box" onSubmit={(e) => e.preventDefault()}>
                <input
                    className="member-search-text"
                    type="text"
                    placeholder="회원명 또는 닉네임 입력"
                    value={searchMember}
                    onChange={handleSearchChange}
                />
                <button className="member-search-button" type="submit">
                    <img className="member-search-button-img" src={SearchIcon} alt="검색" />
                </button>

                <label className="point-top">
                    <input
                        type="radio"
                        name="check"
                        checked={sortPoint === "desc"}
                        onChange={() => handleSortChange("desc")}
                    />
                    포인트 많은순
                </label>

                <label className="point-down">
                    <input
                        type="radio"
                        name="check"
                        checked={sortPoint === "asc"}
                        onChange={() => handleSortChange("asc")}
                    />
                    포인트 적은순
                </label>

                <label className="exit-member">
                    <input
                        type="checkbox"
                        checked={exitMember}
                        onChange={handleExitMemberChange}
                    />
                    탈퇴회원 제외
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
                        currentMembers.map((member) => (
                            <tr key={member.memberNo} onClick={() => handleRowClick(member.memberNo)}>
                                <td>{member.memberNo}</td>
                                <td>{member.memberName}</td>
                                <td>{member.memberNickname}</td>
                                <td>{member.grade}</td>
                                <td
                                    style={{
                                        color: member.status === "ACTIVATED" ? "blue" : member.status === "DELETED" ? "red" : "black",
                                    }}
                                >
                                    {member.status === "ACTIVATED" ? "활동중" : member.status === "DELETED" ? "활동정지" : member.status}
                                </td>
                                <td>{member.memberRole}</td>
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

export default PointList;
