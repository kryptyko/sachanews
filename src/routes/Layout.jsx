import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { ThemeProvider } from "@teishi/bulma_theme";
import Navbar from "../components/Navbar/Navbar";
import Banner from "../components/Banner/Banner";
import { useLocation } from "react-router-dom";

export default function Layout() {
    const { pathname } = useLocation();
    const shouldRenderNavbar = !pathname.includes("/login");
    return (
        <AuthProvider>
            <Banner />
            {/* <Navbar /> */}
            {shouldRenderNavbar && <Navbar />}
            <div
                className={`hero is-fullheight is-flex is-flex-direction-column`}
            >
                <ThemeProvider>
                    <Outlet />
                    
                </ThemeProvider>
            </div>
        </AuthProvider>
    );
}
