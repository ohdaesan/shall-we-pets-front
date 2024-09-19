import "../AdminMenu.css"
import SearchIcon from "../../../images/Search.png"

// 포인트 리스트
function PointList() {
    return(
        <div className="member-line">
            <h1 className="member-search">회원 조회</h1>

            <form className="member-search-box" action="">
                <input className="member-search-text" type="text" placeholder="회원명 입력"/>
                <button className="member-search-button" type="submit">
                    <img className="member-search-button-img" src={SearchIcon}/>
                </button>

            <label className="point-top">
            <input type="radio" name="check"/>포인트 많은순
            </label>

            <label className="point-down">
            <input type="radio" name="check"/>포인트 적은순
            </label>

            <label className="exit-member1">
                <input type="checkbox"/>탈퇴회원 제외
            </label>
            
            </form>

            
            <table className="member-search-table">
                <thead>
                <tr className="member-search-table-tr">
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
                <tr>
                    <td>1</td>
                    <td>이득규</td>
                    <td>사마규</td>
                    <td>새싹리뷰어</td>
                    <td>활동중</td>
                    <td>일반회원</td>
                    <td>10</td>
                </tr>
                </tbody>

                <tbody>
                <tr>
                    <td>2</td>
                    <td>홍주연</td>
                    <td>불곰</td>
                    <td>새싹리뷰어</td>
                    <td>활동중</td>
                    <td>관리자</td>
                    <td>10</td>
                </tr>
                </tbody>

                <tbody>
                <tr>
                    <td>3</td>
                    <td>이의정</td>
                    <td>마멋</td>
                    <td>새싹리뷰어</td>
                    <td>활동중</td>
                    <td>관리자</td>
                    <td>20</td>
                </tr>
                </tbody>

                <tbody>
                <tr>
                    <td>4</td>
                    <td>배하은</td>
                    <td>민달팽이</td>
                    <td>새싹리뷰어</td>
                    <td>활동정지</td>
                    <td>일반회원</td>
                    <td>40</td>
                </tr>
                </tbody>

                <tbody>
                <tr>
                    <td>5</td>
                    <td>이규섭</td>
                    <td>나무늘보</td>
                    <td>새싹리뷰어</td>
                    <td>활동정지</td>
                    <td>일반회원</td>
                    <td>60</td>
                </tr>
                </tbody>
                
            </table>
            
            <a className="previous-page" href="">이전 페이지</a>
            <a className="no1" href="">1</a>
            <a className="no2" href="">2</a>
            <a className="no3" href="">3</a>
            <a className="no4" href="">4</a>
            <a className="no5" href="">5</a>
            <a className="next-page" href="">다음 페이지</a>

        </div>
        
    )
}

export default PointList;