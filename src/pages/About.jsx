import { useState, useEffect } from 'react';
import './About.css';

function About() {
  const [content, setContent] = useState({
    description: localStorage.getItem('aboutDescription') || 
      'Dr.PlantAI, yapay zeka teknolojilerini kullanarak bitki hastalıklarını tespit etmeyi ve çözüm önerileri sunmayı amaçlayan yenilikçi bir projedir.',
    features: JSON.parse(localStorage.getItem('aboutFeatures')) || [
      'Yapay zeka destekli hastalık tespiti',
      'Detaylı toprak analizi',
      'Kişiselleştirilmiş tedavi önerileri',
      'Kullanıcı dostu arayüz'
    ]
  });

  useEffect(() => {
    const handleContentChange = () => {
      setContent({
        description: localStorage.getItem('aboutDescription') || content.description,
        features: JSON.parse(localStorage.getItem('aboutFeatures')) || content.features
      });
    };

    window.addEventListener('contentChanged', handleContentChange);
    return () => window.removeEventListener('contentChanged', handleContentChange);
  }, []);

  return (
    <div className="about-page">
      <h1>Dr.PlantAI Hakkında</h1>
      <div className="about-content">
        <div className="description">
          <p>{content.description}</p>
        </div>
        <div className="features">
          <h3>Özellikler</h3>
          <ul>
            {content.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About; 