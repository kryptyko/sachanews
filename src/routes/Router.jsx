import { createBrowserRouter } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";
//import Home from "../components/Home/Home";
import Login from "../components/Auth/Login";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../components/Profile";
import ArticleList from "../components/Articles/ArticleList";
import ArticlesDeploy from "../components/Articles/ArticlesDeploy";
import NotFound from "../components/NotFound/NotFound";
import CategoryArticles from "../components/Articles/CategoryArticles";
import EditArticleForm from "../components/EditArticleForm";
// import ArticleDetail from "../components/ArticleDetail/ArticleDetail";


const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true, // path: "/"
                //element: <Home />,
                element : <ArticleList />,
            },
            {
                path: "articles",
                children: [
                    {
                        index: true,
                        element: <ArticleList />,
                    },
                    {
                        path: ":id",
                        element: <ArticlesDeploy/>,
                    },
                    {
                        path: "add",
                        element: (
                            <ProtectedRoute>
                                <ArticleForm />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "change/:id",
                        element: (
                            <ProtectedRoute>
                                <EditArticleForm />
                            </ProtectedRoute>
                        ),
                    },
                ],
            },
            {
                path: "login",
                element: <Login />,
                shouldRenderNavbar: false,

            },
            {
            
                    path: "category/:id",
                    element: <CategoryArticles />,
            
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
    
],
    {

      // basename: "/proyectofinal",
    }
);

export { Router };