import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom"; 
import Navbar from './Navbar/Navbar';
import Banner from './Banner/Banner';
import { useNavigate } from "react-router-dom";

export default function EditArticleForm() {
    const [articleData, setArticleData] = useState({ title: "", content: "" });
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingArticle, setLoadingArticle] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [articleImage, setArticleImage] = useState(null);
    
    const navigate = useNavigate();

    const { id } = useParams(); 
    const state = useAuth("state");
    const token = state.token;

    useEffect(() => {
        // Cargar las categorías
        fetch(`${import.meta.env.VITE_API_BASE_URL}infosphere/categories/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        "No se pudieron cargar las categorías"
                    );
                }
                return response.json();
            })
            .then((data) => {
                setCategories(data.results);
            })
            .catch((error) => {
                console.error("Error al realizar la petición", error);
            })
            .finally(() => {
                setLoadingCategories(false);
            });

        // Cargar los datos del artículo existente
        fetch(`${import.meta.env.VITE_API_BASE_URL}infosphere/articles/${id}/`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        "No se pudo cargar el artículo"
                    );
                }
                return response.json();
            })
            .then((data) => {
                setArticleData({ title: data.title, content: data.content });
                setSelectedCategories(data.categories);
            })
            .catch((error) => {
                console.error("Error al cargar el artículo", error);
            })
            .finally(() => {
                setLoadingArticle(false);
            });
    }, [id, token]);

    function handleInputChange(event) {
        setArticleData({
            ...articleData,
            [event.target.name]: event.target.value,
        });
    }

    function handleCategoryChange(event) {
        const selectedOptions = Array.from(
            event.target.selectedOptions,
            (option) => option.value
        );

        const updatedSelectedCategories = categories.filter((cat) =>
            selectedOptions.includes(String(cat.id))
        );

        setSelectedCategories(updatedSelectedCategories);
    }

    function handleImageChange(event) {
        setArticleImage(event.target.files[0]);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!submitting && !loadingCategories && !loadingArticle) {
            setSubmitting(true);
            const newForm = new FormData();
            newForm.append("title", articleData.title);
            newForm.append("content", articleData.content);
            if (articleImage) {
                newForm.append("image", articleImage);
            }
            fetch(`${import.meta.env.VITE_API_BASE_URL}infosphere/articles/${id}/`, {
                method: "PUT", 
                headers: {
                    Authorization: `Token ${token}`,
                },
                body: newForm,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("No se pudo actualizar el artículo");
                    }
                    return response.json();
                })
                .then((data) => {
                    selectedCategories.forEach((category) => {
                        fetch(`${import.meta.env.VITE_API_BASE_URL}infosphere/article-categories/${id}/`, {
                            method: "PUT", 
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Token ${token}`,
                            },
                            body: JSON.stringify({
                                article: data.id,
                                category: category.id,
                            }),
                        });
                    });
                    window.alert('¡Artículo actualizado exitosamente!');
                    navigate('/'); // Redirige a la página principal después de la actualización
                })
                .catch((error) => {
                    console.error("Error al actualizar el artículo", error);
                })
                .finally(() => {
                    setSubmitting(false);
                });
                
        }
    }

    return (
        <div className="container">
            <Banner />
            <Navbar />
            <form
                className={`box m-4 p-4 has-background-dark`}
                onSubmit={handleSubmit}
            >
                <div className="field">
                    <label className="label">Título</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name="title"
                            value={articleData.title}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Contenido</label>
                    <div className="control">
                        <textarea
                            className="textarea"
                            name="content"
                            value={articleData.content}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Imagen:</label>
                    <div className="control">
                        <input
                            className="input"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Categorías:</label>
                    <div className="select is-fullwidth is-multiple">
                        <select
                            multiple
                            size="5"
                            value={selectedCategories.map((cat) => cat.id)}
                            onChange={handleCategoryChange}
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button
                            className="button is-primary"
                            type="submit"
                            disabled={submitting || loadingCategories || loadingArticle} 
                        >
                            Actualizar Artículo
                        </button>
                      
                     </div>
                </div>
            </form>
        </div>
    );
}
