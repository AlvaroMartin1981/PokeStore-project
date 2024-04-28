import { Link } from 'react-router-dom';
import './Footer.css'

const Footer = () => {
    return (
        <>
        <footer>
            <div>
                <p>Proyecto para el bootcamp online de Full Stack de The Bridge.</p>
                <p>Realizado por Álvaro Martín y Adrián Canosa.</p>
            </div>
            <div className='footer_link'>
                <Link to="/about">About</Link>
            </div>
        </footer>
        </>
    );
};

export default Footer;
