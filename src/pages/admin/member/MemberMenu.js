import { useNavigate } from "react-router-dom";
import "../AdminMenu.css"

// 회원 관리 메뉴
function MemberMenu() {

    const navigate = useNavigate();

    const naviMemberInfo = () => {
        navigate("/member_list")
    }

    const naviMemberPoint = () => {
        navigate("/point_list")
    }

    return(
        <div className='background'>
            <br/><br/><br/><h1 className="member-management1">회원 관리</h1>
            <br/><br/><button onClick={naviMemberInfo} className="member-info">회원 정보</button>
            <br/><br/><br/><br/><button className="member-review">회원 리뷰</button>
            <br/><br/><br/><br/><button onClick={naviMemberPoint} className="member-point">포인트</button><br/><br/><br/><br/><br/><br/>
        </div>
    );
}

export default MemberMenu;