import React, { useState, useEffect, useCallback } from 'react';
import { Modal, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import './GlobalTheme.css';

function Files({ favorites, setFavorites }) {
  const [images, setImages] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const imageNames = [
      'image1.jpg',
      'image2.jpg',
    'image3.jpg',
    'image4.jpg',
    'image5.jpg',
    'image6.jpg',
    'image7.jpg',
    'image8.jpg',
    'image9.jpg',
    'image10.jpg',
  ];
    setImages(imageNames);
  }, []);

  const toggleFavorite = (imageFilename) => {
    const isFavorite = favorites.includes(imageFilename);
    setFavorites(isFavorite ? favorites.filter(fav => fav !== imageFilename) : [...favorites, imageFilename]);
  };

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  const handleOpenModal = (index) => {
    setCurrentImageIndex(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="scene-wrapper">
      <h1>Todos os Arquivos</h1>
      <div className="imageContainer">
        {images.map((image, index) => (
          <img 
            key={index} 
            src={`/images/${image}`} 
            alt={image} 
            className="imageItem" 
            onClick={() => handleOpenModal(index)}
            style={{ width: '230px' }}
          />
        ))}
      </div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <div className="modalContent">
          <IconButton onClick={prevImage} style={{ color: 'white' }}><ArrowBackIcon /></IconButton>
          <img 
            src={`/images/${images[currentImageIndex]}`} 
            alt={images[currentImageIndex]} 
            className="modalImage"
          />
          <StarIcon 
            className={favorites.includes(images[currentImageIndex]) ? 'starIconFilled' : 'starIcon'}
            onClick={() => toggleFavorite(images[currentImageIndex])}
          />
          <IconButton onClick={nextImage} style={{ color: 'white' }}><ArrowForwardIcon /></IconButton>
        </div>
      </Modal>
    </div>
  );
}

export default Files;

