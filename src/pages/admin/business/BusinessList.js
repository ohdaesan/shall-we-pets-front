import "../AdminMenu.css"
import SearchIcon from "../../../images/Search.png"

// 업체 리스트, 검색
function BusinessList() {
    return(
        <div className="member-line">
            <h1 className="member-search">업체 조회</h1>

            <form className="member-search-box" action="">
                <input className="member-search-text" type="text" placeholder="장소명 입력"/>
                <button className="member-search-button" type="submit">
                    <img className="member-search-button-img" src={SearchIcon}/>
                </button>

            <label className="business-list-category">카테고리</label>
            <select className="business-list-category-choice">
                <option>카테고리 선택 ⇩</option>
                <option>반려동물 서비스</option>
                <option>식당-카페</option>
                <option>동반 여행</option>
                <option>문화시설</option>
                <option>애완병원</option>
            </select>

            <label className="business-list-location">위치</label>
            <select className="business-list-location-choice">
                <option>지역 선택 ⇩</option>
                <option>서울</option>
                <option>경기, 인천</option>
                <option>강원</option>
                <option>충청, 대전, 세종</option>
                <option>전라, 광주</option>
                <option>경상, 부산, 울산, 대구</option>
                <option>제주</option>
            </select>

            <select className="business-list-location-sigungu">
                <option>장소 선택(시,군,구) ⇩</option>
                <option>강남구</option>
                <option>강동구</option>
                <option>강북구</option>
                <option>강서구</option>
                <option>관악구</option>
                <option>광진구</option>
                <option>구로구</option>
                <option>금천구</option>
            </select>

            <label className="search-high-soon">
            <input type="radio" name="check"/>조회수 높은순
            </label>

            <label className="search-row-soon">
            <input type="radio" name="check"/>조회수 낮은순
            </label>

            <label className="ok">
                <input type="checkbox"/>승인
            </label>

            <label className="out">
                <input type="checkbox"/>반려
            </label>

            <label className="ok-wait">
                <input type="checkbox"/>승인 대기
            </label>

            </form>

            
            <table className="member-search-table">
                <thead>
                <tr className="member-search-table-tr">
                    <th>장소명</th>
                    <th>주소</th>
                    <th>카테고리</th>
                    <th>승인여부</th>
                    <th>조회수</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>강아지대통령</td>
                    <td>서울시 강남구 삼성동 145-9</td>
                    <td>반려동물 서비스</td>
                    <td>승인</td>
                    <td>500</td>
                </tr>
                </tbody>

                <tbody>
                <tr>
                    <td>강아지아이들</td>
                    <td>서울시 강남구 성북동 936</td>
                    <td>반려동물 서비스</td>
                    <td>승인</td>
                    <td>450</td>
                </tr>
                </tbody>

                <tbody>
                <tr>
                    <td>강남강아지</td>
                    <td>서울시 강남구 역삼동 724-45</td>
                    <td>문화시설</td>
                    <td>승인</td>
                    <td>400</td>
                </tr>
                </tbody>

                <tbody>
                <tr>
                    <td>강남똥개</td>
                    <td>서울시 강남구 대치동 906-15</td>
                    <td>식당-카페</td>
                    <td>승인</td>
                    <td>350</td>
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

export default BusinessList;