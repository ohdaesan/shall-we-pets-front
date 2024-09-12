import "./AdminMenu.css"

// 관리자 메인페이지
function AdminMenu() {

    return(
        <div className='background'>
            <br/><br/><br/><h1 className="admin-menu">관리자 메뉴</h1>
            <br/><br/><br/><br/><button className="member-management">회원 관리</button>
            <br/><br/><br/><br/><button className="business-management">업체 관리</button><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    );
}

export default AdminMenu;