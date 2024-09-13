import "../AdminMenu.css"
import SearchIcon from "../../../images/Search.png"

// 등록 신청 업체 리스트, 검색
function AppliedList() {
    return(
        <div className="member-line">
            <h1 className="member-search">등록 신청 업체</h1>

            <form className="member-search-box" action="">
                <input className="member-search-text" type="text" placeholder="업체명 입력"/>
                <button className="member-search-button" type="submit">
                    <img className="member-search-button-img" src={SearchIcon}/>
                </button>

            <label className="new-soon">
            <input type="radio" name="check"/>최신순
            </label>

            <label className="old-soon">
            <input type="radio" name="check"/>오래된순
            </label>
            
            </form>

            
            <table className="member-search-table">
                <thead>
                <tr className="member-search-table-tr">
                    <th>업체번호</th>
                    <th>장소명</th>
                    <th>주소</th>
                    <th>카테고리</th>
                    <th>조회수</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>111</td>
                    <td>강아지대통령</td>
                    <td>서울시 강남구 삼성동 145-9</td>
                    <td>식당-카페</td>
                    <td>325</td>
                </tr>
                </tbody>

                <tbody>
                <tr>
                    <td>112</td>
                    <td>강아지아이들</td>
                    <td>서울시 강남구 성북동 936</td>
                    <td>반려동물 서비스</td>
                    <td>310</td>
                </tr>
                </tbody>

                <tbody>
                <tr>
                    <td>113</td>
                    <td>강남강아지</td>
                    <td>서울시 강남구 역삼동 724-45</td>
                    <td>문화시설</td>
                    <td>270</td>
                </tr>
                </tbody>

                <tbody>
                <tr>
                    <td>114</td>
                    <td>강남똥개</td>
                    <td>서울시 강남구 대치동 906-15</td>
                    <td>식당-카페</td>
                    <td>256</td>
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

export default AppliedList;