import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Banner from "../Banner/Banner";
import Navbar from "../Navbar/Navbar";
import ArticlesCard from "./ArticleCard";
import { useAuth } from "../../contexts/AuthContext";

export default function CategoryArticles() {
    const { id } = useParams();
    const [articles, setArticles] = useState([]);
    const [categoryDescription, setCategoryDescription] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const {first_name} =useAuth("state");


    useEffect(() => {
        
        const fetchArticles = async () => {
            //console.log( first_name)
            try {
                // hago un fetch para obtener la descripción de la categoria
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}infosphere/categories/${id}`);
                const data = await response.json();

                // hago un fetch para obtener los detalles de cada articulo promise.all espera a que terminen todos los fetch? 
                const articleDetails = await Promise.all(  
                    data.articles.map(articleId =>
                        fetch(`${import.meta.env.VITE_API_BASE_URL}infosphere/articles/${articleId}`)
                            .then(res => res.json())
                    )
                );
                // seteo los articulos en el estado
                setArticles(articleDetails); 
                setCategoryDescription(data.description || 'Sin descripcion');
                setCategoryName(data.name);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };

        fetchArticles();
    }, [id]);

return (
    <div className="container">
        <Banner />
        <Navbar />
        <div className="columns is-multiline">
            <div className="column is-12">
                {/* <h1>{categoryDescription}</h1> */}
                <h1>{first_name} estas en la categoria {categoryName} </h1>
            </div>
            {articles.map(article => (
                <div className="column is-4" key={article.id}>
                    <ArticlesCard article={article} />
                </div>
            ))}
        </div>
    </div>
);
}