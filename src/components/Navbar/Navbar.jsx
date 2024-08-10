import { useState, useEffect } from "react";

export default function Navbar() {
    const [categories, setCategories] = useState([]);

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
          </div>
      </nav>
  );
}