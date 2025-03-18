import { useState } from 'react';
import './LoginModal.css';

function LoginModal({ onClose, onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      onLogin();
      onClose();
    } else {
      // Kayıt işlemleri burada yapılacak
      console.log('Kayıt bilgileri:', formData);
      onClose();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">
          {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
        </h2>
        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
              <label>Kullanıcı Adı</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="input"
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label>Şifre</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="button button-secondary">
              İptal
            </button>
            <button type="submit" className="button button-primary">
              {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
            </button>
          </div>
        </form>
        <div className="modal-footer">
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="switch-auth-mode"
          >
            {isLogin ? 'Hesabınız yok mu? Kayıt olun' : 'Zaten hesabınız var mı? Giriş yapın'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;