import { useNavigate } from "react-router-dom";
import "./AdminMenu.css"

// 관리자 메인페이지
function AdminMenu() {

    const navigate = useNavigate();

    const naviMemberManagement = () => {
        navigate("/member_menu")
    }

    const naviBusinessManagement = () => {
        navigate("/business_menu")
    }

    const home = () => {
        navigate("/")
    }

    return(
        <div className='background'>
            <br/><br/><br/><h1 className="admin-menu">관리자 메뉴</h1>
            <br/><br/><br/><br/><button onClick={home} className="member-management">홈</button>
            <br/><br/><br/><br/><button onClick={naviMemberManagement} className="member-management">회원 관리</button>
            <br/><br/><br/><br/><button onClick={naviBusinessManagement} className="business-management">업체 관리</button><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    );
}

export default AdminMenu;