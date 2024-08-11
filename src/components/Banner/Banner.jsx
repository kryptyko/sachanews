import './Banner.css';
import { Link } from 'react-router-dom';
import SachaNEWSSvg from '../../assets/sachanews.svg';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const { isAuthenticated, first_name, image } = useAuth("state");
  const { logout } = useAuth("actions");
  const navigate = useNavigate();

  console.log(first_name);

  return (
    <>
      <div className="has-text-centered">
        <div className="columns is-vcentered">
          <div className="column">

          </div>
          <div className="column">
            <div className="title has-text-primary d-flex justify-content-center align-items-center">
              <img src={SachaNEWSSvg} alt="SachaNEWS Logo" className="logo-image" />
            </div>
          </div>
          <div className="column align-items-end">
            {isAuthenticated && (
                               <div className="d-flex flex-column align-items-end">
                                <div className="d-flex align-items-center mb-3">
                                    {/* <div className="image is-96x96 is-rounded mr-2">
                                      <img className= "is-rounded" src={image || "https://bulma.io/assets/images/placeholders/96x96.png"} alt="imagen" />
                                    </div> */}
                                  <div className="user-greeting">
                                    Hola{' '}
                                    <Link to="/profile" className="has-text-primary">
                                      <span>{first_name}</span>
                                    </Link>
                                  </div>
                                </div> 
                              
                               </div>
                              )}
                        <button className="button is-warning is-small is-outlined"onClick={() => {
                                isAuthenticated ? logout() : navigate('/login');
                                window.alert(isAuthenticated ? 'Sesión cerrada correctamente' : '');}}>
                          {isAuthenticated ? 'Cerrar sesión' : 'Iniciar Sesión'}
                        </button>
          </div> {/*fin columna3*/}
        </div>
      </div>
      
    </>
  );
};

export default Banner;