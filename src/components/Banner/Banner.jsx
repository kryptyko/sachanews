
import './Banner.css';
import { Link } from 'react-router-dom';
import SachaNEWSSvg from '../../assets/sachanews.svg';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


const Banner = () => {
  const { isAuthenticated, first_name } = useAuth("state");
  const { logout } = useAuth("actions");
  const navigate = useNavigate();

  console.log( first_name)

  return (
    <>
      <div className="has-text-centered">
        <div className="columns is-vcentered">
          <div className="column"></div>
          <div className="column">
            <div className="title has-text-primary d-flex justify-content-center align-items-center">
              <img src={SachaNEWSSvg} alt="SachaNEWS Logo" className="logo-image" />
            </div>
          </div>
          <div className="column">

            {isAuthenticated && (
              <div className="d-flex justify-content-end">
                <div className="user-greeting mr-3">
              Hola{' '}
              <Link to="/profile" className="has-text-primary">
                <span>{first_name}</span>
              </Link>
            </div>
              </div>
            )}
            <button
                  className="button is-warning is-small is-outlined"
                  onClick={() => {
                    isAuthenticated ? logout() : navigate('/login');
                    window.alert(isAuthenticated ? 'Sesión cerrada correctamente' : '');
                  }}
                >
                  {isAuthenticated ? 'Cerrar sesión' : 'Iniciar Sesión'}
                </button>
          </div>
        </div>
        {isAuthenticated && (
          <div className="d-flex justify-content-end">
            
          </div>
        )}
      </div>
    </>
  );
};

export default Banner;