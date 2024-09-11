import {Outlet} from "react-router-dom";
import Header from "../components/commons/Header"
import Footer from "../components/commons/Footer"
import Navbar_MyPage from "../components/commons/Navbar_MyPage";

function Layout() {
    return (
        <div>
            <Header/>
            <Navbar_MyPage/>
            <Outlet/>
            <Footer/>
        </div>
    );
}

export default Layout;