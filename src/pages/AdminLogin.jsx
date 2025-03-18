import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Admin bilgileri kontrolü
    if ((credentials.username === 'admin' && credentials.password === 'admin123') || 
        (credentials.username === 'john' && credentials.password === '1234')) {
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('adminUser', credentials.username); // Hangi admin girdiğini kaydet
      navigate('/admin/panel');
    } else {
      setError('Geçersiz kullanıcı adı veya şifre');
    }
  };

  return (
    <div className="admin-login">
      <form onSubmit={handleSubmit} className="admin-login-form">
        <h2>Admin Girişi</h2>
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="username">Kullanıcı Adı:</label>
          <input
            type="text"
            id="username"
            value={credentials.username}
            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            required
            placeholder="Kullanıcı adınızı girin"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Şifre:</label>
          <input
            type="password"
            id="password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            required
            placeholder="Şifrenizi girin"
          />
        </div>

        <button type="submit" className="admin-login-button">
          Giriş Yap
        </button>
      </form>
    </div>
  );
}

export default AdminLogin; 