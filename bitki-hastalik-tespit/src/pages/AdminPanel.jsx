import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

function AdminPanel() {
  const [activeSection, setActiveSection] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentBackground, setCurrentBackground] = useState(localStorage.getItem('backgroundImage') || '/background.jpg');
  const [content, setContent] = useState({
    about: {
      description: localStorage.getItem('aboutDescription') || 
        'Dr.PlantAI, yapay zeka teknolojilerini kullanarak bitki hastalıklarını tespit etmeyi ve çözüm önerileri sunmayı amaçlayan yenilikçi bir projedir.',
      features: JSON.parse(localStorage.getItem('aboutFeatures')) || [
        'Yapay zeka destekli hastalık tespiti',
        'Detaylı toprak analizi',
        'Kişiselleştirilmiş tedavi önerileri',
        'Kullanıcı dostu arayüz'
      ]
    },
    homeFooter: localStorage.getItem('homeFooterContent') || 'Bitkilerinizin sağlığı bizim önceliğimizdir.'
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Admin kontrolü
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/AdminLogin');
    }
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = () => {
    if (selectedImage) {
      // Arkaplan resmini localStorage'a kaydet
      localStorage.setItem('backgroundImage', selectedImage);
      setCurrentBackground(selectedImage);
      // App.js'deki arkaplanı güncellemek için bir event yayınla
      window.dispatchEvent(new Event('backgroundChanged'));
      alert('Arkaplan başarıyla güncellendi!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminUser');
    navigate('/'); // Ana sayfaya yönlendir
  };

  const handleContentSave = () => {
    localStorage.setItem('aboutDescription', content.about.description);
    localStorage.setItem('aboutFeatures', JSON.stringify(content.about.features));
    localStorage.setItem('homeFooterContent', content.homeFooter);
    window.dispatchEvent(new Event('contentChanged'));
    alert('İçerik başarıyla güncellendi!');
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...content.about.features];
    newFeatures[index] = value;
    setContent({
      ...content,
      about: {
        ...content.about,
        features: newFeatures
      }
    });
  };

  const addFeature = () => {
    setContent({
      ...content,
      about: {
        ...content.about,
        features: [...content.about.features, '']
      }
    });
  };

  const removeFeature = (index) => {
    const newFeatures = content.about.features.filter((_, i) => i !== index);
    setContent({
      ...content,
      about: {
        ...content.about,
        features: newFeatures
      }
    });
  };

  const sections = [
    {
      id: 'users',
      title: 'Kullanıcı Yönetimi',
      content: (
        <div className="section-content">
          <h3>Kullanıcı Listesi</h3>
          {/* Kullanıcı yönetimi içeriği buraya gelecek */}
          <table className="users-table">
            <thead>
              <tr>
                <th>Kullanıcı Adı</th>
                <th>E-posta</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>örnek_kullanıcı</td>
                <td>ornek@mail.com</td>
                <td>
                  <button className="edit-button">Düzenle</button>
                  <button className="delete-button">Sil</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    },
    {
      id: 'background',
      title: 'Arkaplan Yönetimi',
      content: (
        <div className="section-content">
          <h3>Arkaplan Resmi Değiştir</h3>
          <div className="image-upload-section">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              className="image-input"
            />
            <button 
              className="upload-button"
              onClick={handleImageUpload}
              disabled={!selectedImage}
            >
              Yükle ve Uygula
            </button>
          </div>
          <div className="background-preview">
            <h4>Önizleme</h4>
            {selectedImage && (
              <img 
                src={selectedImage} 
                alt="Yeni arkaplan önizlemesi" 
                className="preview-image"
              />
            )}
          </div>
          <div className="current-background">
            <h4>Mevcut Arkaplan</h4>
            <img 
              src={currentBackground} 
              alt="Mevcut arkaplan" 
              className="current-image"
            />
          </div>
        </div>
      )
    },
    {
      id: 'content',
      title: 'İçerik Yönetimi',
      content: (
        <div className="section-content">
          <h3>Metin İçerikleri</h3>
          <div className="content-edit-section">
            <div className="form-group">
              <label>Hakkımızda Açıklaması:</label>
              <textarea 
                rows="6" 
                value={content.about.description}
                onChange={(e) => setContent({
                  ...content,
                  about: {
                    ...content.about,
                    description: e.target.value
                  }
                })}
                placeholder="Hakkımızda sayfası için açıklama girin..."
              />
            </div>

            <div className="form-group">
              <label>Özellikler:</label>
              {content.about.features.map((feature, index) => (
                <div key={index} className="feature-input">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder={`Özellik ${index + 1}`}
                  />
                  <button 
                    type="button" 
                    className="remove-feature"
                    onClick={() => removeFeature(index)}
                  >
                    Sil
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                className="add-feature"
                onClick={addFeature}
              >
                Yeni Özellik Ekle
              </button>
            </div>

            <div className="form-group">
              <label>Ana Sayfa Footer Açıklaması:</label>
              <textarea 
                rows="4" 
                value={content.homeFooter}
                onChange={(e) => setContent({...content, homeFooter: e.target.value})}
                placeholder="Ana sayfa footer metni girin..."
              />
            </div>

            <button className="save-button" onClick={handleContentSave}>
              Değişiklikleri Kaydet
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>Admin Paneli</h2>
        <button 
          className="logout-button"
          onClick={handleLogout}
        >
          Çıkış Yap
        </button>
      </div>

      <div className="admin-sections">
        {sections.map(section => (
          <div 
            key={section.id}
            className={`admin-section ${activeSection === section.id ? 'active' : ''}`}
          >
            <div 
              className="section-header"
              onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
            >
              <h3>{section.title}</h3>
              <span className="toggle-icon">
                {activeSection === section.id ? '−' : '+'}
              </span>
            </div>
            {activeSection === section.id && (
              <div className="section-body" onClick={(e) => e.stopPropagation()}>
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel; 