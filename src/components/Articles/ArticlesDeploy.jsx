import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function ArticlesDeploy(onDelete) {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [authorDetails, setAuthorDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const authState = useAuth("state");
    const token = authState ? authState.token : null;
    const user__id = authState ? authState.user__id : null;
    // const { token, user__id } = useAuth("state");

    useEffect(() => {
        // Fetch del artículo
        fetch(`${import.meta.env.VITE_API_BASE_URL}infosphere/articles/${id}/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo cargar la noticia");
                }
                return response.json();
            })
            .then((data) => {
                setArticle(data);
                // Obtener detalles del autor solo si hay un token
                if (token) {
                    return fetch(`${import.meta.env.VITE_API_BASE_URL}users/profiles/${data.author}/`, {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("No se pudieron cargar los datos del autor");
                        }
                        return response.json();
                    })
                    .then((authorData) => {
                        setAuthorDetails(authorData);
                    });
                }
            })
            .catch(() => {
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id, token]);

    if (isLoading) {
        return <p>Cargando...</p>;
    }

    if (isError) {
        return <p>Error al cargar la noticia</p>;
    }

    const handleDelete = () => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}infosphere/articles/${id}/`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${token}`,
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("No se pudo eliminar el Artículo");
            }
            onDelete(article.id);
        })
        .catch((error) => {
            console.error("Error al eliminar", error);
        });
    };

    const formattedDate = new Date(article.updated_at).toLocaleString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });

    return (
        <div className="container my-6">
            <div className="box">
                <h1 className="title">{article.title}</h1>
                <p className="subtitle is-6 mb-4">{article.abstract}</p>
                <div className="level">
                    <div className="level-left">
                        <p className="level-item">Actualizado: {formattedDate}</p>
                    </div>
                    <div className="level-right">
                        {authorDetails && (
                            <div className="level-item">
                                <p>{`Autor: ${authorDetails.first_name} ${authorDetails.last_name}`}</p>
                            </div>
                        )}
                    </div>
                </div>
                {article.image && <img src={article.image} alt={article.caption} className="mb-4" />}
                <div className="content">
                    {article.content}
                </div>
                {article.image && <p className="has-text-grey-light has-text-right">{article.caption}</p>}
                <div className="level">
                    <div className="level-right">
                        <p className="level-item">
                            <span className="icon-text">
                                <span className="icon">
                                    <i className="fas fa-eye"></i>
                                </span>
                                <span>Visitas: {article.view_count}</span>
                            </span>
                        </p>
                    </div>
                </div>
                
                {token && article.author === user__id && (
                    <>
                        <button className="button is-success" onClick={(e) => {
                            e.preventDefault();
                            handleDelete();
                            window.alert('Artículo eliminado');
                            navigate("/articles");
                        }} style={{ marginRight: '20px' }}>
                            Eliminar
                        </button>
                        
                        <button className="button is-success" onClick={(e) => {
                            e.preventDefault();
                            navigate(`/articles/change/${article.id}`);
                        }}>
                            Modificar
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default ArticlesDeploy;