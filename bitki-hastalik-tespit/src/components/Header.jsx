import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">Bitki Hastalık Tespit</h1>
        <div className="auth-buttons">
          <Link to="/login" className="auth-button">
            Giriş Yap
          </Link>
          <Link to="/register" className="auth-button">
            Kayıt Ol
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header; 