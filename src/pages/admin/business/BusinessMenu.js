import { useNavigate } from "react-router-dom";
import "../AdminMenu.css"

// 업체 관리 메뉴
function BusinessMenu() {

    const navigate = useNavigate();

    const naviBusinessRegistOk = () => {
        navigate("/applied_list")
    }

    const naviBusinessSearch = () => {
        navigate("/business_list")
    }

    return(
        <div className='background'>
            <br/><br/><br/><h1 className="business-management1">업체 관리</h1>
            <br/><br/><br/><br/><button onClick={naviBusinessRegistOk} className="business-registok">업체 등록 승인</button>
            <br/><br/><br/><br/><button onClick={naviBusinessSearch} className="business-search">업체 조회</button><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    );
}

export default BusinessMenu;