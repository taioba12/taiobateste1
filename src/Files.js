import React, { useState, useEffect, useCallback } from 'react';
import { Modal, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './GlobalTheme.css';

function Files() {
  const [images, setImages] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Lista de nomes de imagens na pasta /images (substitua pelos nomes reais dos arquivos)
    const imageNames = 
    [
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


const nextImage = useCallback(() => {
  setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
}, [images.length]);

const prevImage = useCallback(() => {
  setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
}, [images.length]);

useEffect(() => {
  const handleKeydown = (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        prevImage();
        break;
      case 'ArrowRight':
        nextImage();
        break;
      default:
        break;
    }
  };

  if (openModal) {
    window.addEventListener('keydown', handleKeydown);
  }
  return () => {
    window.removeEventListener('keydown', handleKeydown);
  };
}, [openModal, currentImageIndex, images, nextImage, prevImage]);

  const handleOpenModal = (index) => {
    setCurrentImageIndex(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  return (
    <div className="scene-wrapper">
          <h1>Todos os Arquivos</h1>  {/* Adicionado título */}
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
          <IconButton onClick={nextImage} style={{ color: 'white' }}><ArrowForwardIcon /></IconButton>
        </div>
      </Modal>
    </div>
  );
}

export default Files;