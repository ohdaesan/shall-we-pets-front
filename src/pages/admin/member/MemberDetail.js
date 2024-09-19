import "../AdminMenu.css"
import Logo from "../../../images/shallwepets_logo.png"

// 회원정보페이지
function MemberDetail() {
    return(
        <div className="member-info-navbar">
            <h1 className="member-info-page">회원정보 페이지</h1>

            <div className="member-info-navbar1">
                <br/><a href="">회원 정보</a><br/><br/>
                <a href="">회원 리뷰</a><br/><br/>
                <a href="">포인트 내역</a><br/>
                <img className="member-detail-logo" src={Logo}/>
            </div>
        </div>
        
        
    )
}

export default MemberDetail;