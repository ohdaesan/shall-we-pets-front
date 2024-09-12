import {Outlet} from "react-router-dom";
import Header from "../components/commons/Header"
import Footer from "../components/commons/Footer"
import "./Layout.css"
import Navbar_MyPage from "../components/commons/Navbar_MyPage";


function Layout() {
    return (
        <div className="layout">
            <Header/>
            <main className="content">
                <Navbar_MyPage/>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
}

export default Layout;