import React, { useState, useCallback } from 'react';
import { Modal, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import './GlobalTheme.css';
import { useNavigate } from 'react-router-dom';

const Favorites = ({ favorites, setFavorites }) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [imageVisible, setImageVisible] = useState(true); // Adicionado estado para visibilidade da imagem expandida
  const navigate = useNavigate();

  const toggleFavorite = (imageFilename, isExpanded) => {
    const isFavorite = favorites.includes(imageFilename);
    if (isFavorite) {
      const element = document.getElementById(`fav-${imageFilename}`);
      if (element) {
        element.classList.add("fadeOutDown");
        setTimeout(() => {
          setFavorites(favorites.filter(fav => fav !== imageFilename));
        }, 500);
  
        if (isExpanded) {
          setImageVisible(false);  // Ocultar a imagem expandida
          // Ajuste o tempo aqui para ser maior que 500 ms, se necessário
          setTimeout(() => {
            handleCloseModal();
            navigate('/favorites');
          }, 700);
        }
      }
    } else {
      setFavorites([...favorites, imageFilename]);
    }
  };
  const nextImage = useCallback(() => {
    const currentIndex = favorites.indexOf(currentImage);
    const nextIndex = (currentIndex + 1) % favorites.length;
    setCurrentImage(favorites[nextIndex]);
  }, [currentImage, favorites]);

  const prevImage = useCallback(() => {
    const currentIndex = favorites.indexOf(currentImage);
    const prevIndex = (currentIndex - 1 + favorites.length) % favorites.length;
    setCurrentImage(favorites[prevIndex]);
  }, [currentImage, favorites]);

  const handleOpenModal = (imageName) => {
    setCurrentImage(imageName);
    setOpenModal(true);
    setImageVisible(true); // Mostrar a imagem quando a modal é aberta
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    // Ocultar a imagem quando a modal é fechada
    setImageVisible(false);
  };

  return (
    <div className="scene-wrapper">
      <h1>Favoritos</h1>
      <div className="imageContainer">
        {favorites.map((image) => (
          <div key={image} className="imageWrapper" id={`fav-${image}`} style={{ position: 'relative' }}>
            <img 
              src={`/images/${image}`} 
              alt={image} 
              className="imageItem" 
              onClick={() => handleOpenModal(image)}
            />
            <StarIcon 
              className="starIconFilled"
              style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer' }}
              onClick={() => toggleFavorite(image, false)}
            />
          </div>
        ))}
      </div>
      <Modal open={openModal} onClose={handleCloseModal}>
  <div className="modalContent" style={{ position: 'absolute' }}>
    <div className={imageVisible ? "" : "fadeOutDown"}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={prevImage} style={{ color: 'white', flex: '1' }}>
          <ArrowBackIcon />
        </IconButton>
        <div style={{ position: 'relative' }}>
          <img src={`/images/${currentImage}`} alt={currentImage} className="modalImage" />
          <StarIcon
            className="starIconFilled"
            style={{ position: 'absolute', top: '50px', right: '70px', cursor: 'pointer' }}
            onClick={() => toggleFavorite(currentImage, true)}
          />
        </div>
        <IconButton onClick={nextImage} style={{ color: 'white', flex: '1' }}>
          <ArrowForwardIcon />
        </IconButton>
      </div>
    </div>
  </div>
</Modal>
    </div>
  );
};

export default Favorites;