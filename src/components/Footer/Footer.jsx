
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faYoutube, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="footer has-background-dark">
      <div className="content has-text-centered">
        <div className="social-icons">
          <a href="#" className="icon has-text-white mr-4">
            <FontAwesomeIcon icon={faFacebookF} size="2x" />
          </a>
          <a href="#" className="icon has-text-white mr-4">
            <FontAwesomeIcon icon={faInstagram} size="2x"/>
          </a>
          <a href="#" className="icon has-text-white mr-4">
            <FontAwesomeIcon icon={faYoutube}size="2x" />
          </a>
          <a href="#" className="icon has-text-white mr-4">
            <FontAwesomeIcon icon={faTwitter} size="2x"/>
          </a>
          <a href="#" className="icon has-text-white mr-4">
            <FontAwesomeIcon icon={faLinkedinIn}size="2x"/>
          </a>
         
        </div>
        <hr className="navbar-divider has-background-white" />
        <p className="has-text-white">
          © 2024 SachaNews, Inc. | 
          <a href="#" className="has-text-white ml-2">Aspectos legales</a> | 
          <a href="#" className="has-text-white ml-2">Política de privacidad</a> | 
          <a href="#" className="has-text-white ml-2">Seguridad</a> | 
          <a href="#" className="has-text-white ml-2">Accesibilidad en sitios web</a>
        </p>
      </div>
    </footer>
  );
}
