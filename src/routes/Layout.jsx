import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { ThemeProvider } from "@teishi/bulma_theme";
import Navbar from "../components/Navbar/Navbar";
import Banner from "../components/Banner/Banner";
import Footer from "../components/Footer/Footer";
export default function Layout() {
    return (
        <AuthProvider>
            <Banner />
            <Navbar />
            <div
                className={`hero is-fullheight is-flex is-flex-direction-column`}
            >
                <ThemeProvider>
                    <Outlet />
                    
                </ThemeProvider>
            </div>
            <Footer/>
        </AuthProvider>
    );
}
