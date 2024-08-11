import { useState, useEffect } from "react";
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [categories, setCategories] = useState([]);
    const { isAuthenticated} = useAuth("state");
    const { logout } = useAuth("actions");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://sandbox.academiadevelopers.com/infosphere/categories/");
                const data = await response.json();
                setCategories(data.results);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item has-text-warning" href="/">Inicio</a>
            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
      
          <div className="navbar-menu">
            <div className="navbar-start">
              {categories.map(category => (
                <a key={category.id} className="navbar-item has-text-white" href={`/category/${category.id}`}>
                  {category.name}
                </a>
              ))}
            </div>
            <div className="navbar-end">
              {isAuthenticated && (
                <a className="navbar-item has-text-white" href="/articles/add">
                  Nueva Noticia
                </a>
              )}
              {/* <div className="navbar-item">
                <button className="button is-warning" onClick={
                  isAuthenticated
                    ? () => {
                      logout();
                      window.alert ("Sesion cerrada correctamente")
                      
                    }
                    : () => {
                      navigate("/login");
                    }
                }>
                  {isAuthenticated ? "Cerrar sesión" : "Iniciar Sesión"}
                </button>
              </div> */}
            </div>
          </div>
        </nav>
      );}