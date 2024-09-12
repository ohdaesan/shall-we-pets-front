import {Outlet} from "react-router-dom";
import Header from "../components/commons/Header"
import Footer from "../components/commons/Footer"
import "./Layout.css"
import Myinfo from "../pages/mypage/MyInfo";


function Layout() {
    return (
        <div className="layout">
            <Header/>
            <main className="content">
                <Myinfo/>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
}

export default Layout;