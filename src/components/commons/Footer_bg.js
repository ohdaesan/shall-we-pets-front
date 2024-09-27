import "./Footer_bg.css";

function Footer_bg() {
    return (
        <div id="footer-bg">
            <b>Ohdaesan Inc.</b>강원도 평창군 진부면 동산리<br/>
            <span>대표: 오대산 백호</span>|<span>사업자 등록번호: 001-01-00001</span>|<span>이메일: ohdaesan@naver.com</span><br/>
            <span>대표번호: 02-0000-0000</span>|<span>팩스번호: 02-0000-0000</span><br/>
            <a href="/termsOfUse" className="termsOfUse"><b>이용약관</b></a>|<a href="/privacyPolicy" className="privacyPolicy"><b>개인정보처리방침</b></a><br/>
            <b style={{fontSize: "x-small"}}>Copyright ©️ Ohdaesan Inc. All Rights Reserved.</b>
        </div>
    );
}

export default Footer_bg;