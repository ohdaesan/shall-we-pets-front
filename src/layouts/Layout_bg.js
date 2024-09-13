import {Outlet} from "react-router-dom";
import Header from "../components/commons/Header"
import Footer_bg from "../components/commons/Footer_bg"
import backgroundImage from '../images/잔디밭.png';
import "./Layout.css"

function Layout_bg() {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '99vh',
        backgroundColor: '#FFFDD0',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    const mainStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    };

    return (
        <div className="layout" style={containerStyle}>
            <Header />
            <main style={mainStyle}>
                <Outlet />
                <Footer_bg/>
            </main>
        </div>
    );
}

export default Layout_bg;