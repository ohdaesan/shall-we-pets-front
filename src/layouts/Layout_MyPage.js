import {Outlet} from "react-router-dom";
import Header from "../components/commons/Header"
import Footer from "../components/commons/Footer"
import Navbar_MyPage from "../components/commons/Navbar_MyPage";
import "./Layout_Mypage.css"

function Layout_MyPage() {
    return (

        <div className="layout-mypage">
            <Header />
            <div className="mypage-content">
                
                <div className="mypage-container">
                    <Navbar_MyPage/>
                    <main className="mypage-main">
                        <Outlet />
                    </main>
                </div>
            </div>
            <Footer />
            </div>
            
    );
}

export default Layout_MyPage;