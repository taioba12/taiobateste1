import React, { useState, useEffect, useCallback } from 'react';
import { Paper, TextField, Autocomplete, Modal, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Main.css';
import './Sidebar.css';
import './GlobalTheme.css';

function Main() {
  const [searchTerms, setSearchTerms] = useState([]);
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [allHashtags, setAllHashtags] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const imageList = [
      { id: 1, filename: 'image1.jpg', hashtags: ['#teste', '#dinheiro'] },
      { id: 2, filename: 'image2.jpg', hashtags: ['#teste', '#familia'] },
      { id: 3, filename: 'image3.jpg', hashtags: ['#teste', '#familia'] },
      { id: 4, filename: 'image4.jpg', hashtags: ['#teste', '#familia'] },
      { id: 5, filename: 'image5.jpg', hashtags: ['#teste', '#religião'] },
      { id: 6, filename: 'image6.jpg', hashtags: ['#teste', '#religião'] },
      { id: 7, filename: 'image7.jpg', hashtags: ['#teste', '#investimentos'] },
      { id: 8, filename: 'image8.jpg', hashtags: ['#teste', '#vida'] },
      { id: 9, filename: 'image9.jpg', hashtags: ['#teste', '#vida'] },
      { id: 10, filename: 'image10.jpg', hashtags: ['#teste', '#saúde'] },
    ];
    const allHash = imageList.map(img => img.hashtags).flat();
    setAllHashtags([...new Set(allHash)]);
    setImages(imageList);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % filteredImages.length);
  }, [filteredImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + filteredImages.length) % filteredImages.length);
  }, [filteredImages.length]);

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
  }, [openModal, currentImageIndex, filteredImages, prevImage, nextImage]);

  const handleSearch = () => {
    const results = images.filter(image => 
      searchTerms.some(term => image.hashtags.includes(term))
    );
    setFilteredImages(results);
  };

  const handleOpenModal = (index) => {
    setCurrentImageIndex(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };



  return (
    <div className="mainContainer">
      <Paper elevation={3} className="searchBox">
        <Autocomplete
          multiple
          id="search-box"
          options={allHashtags}
          freeSolo
          renderInput={(params) => (
            <TextField 
              {...params} 
              label="Buscar..." 
              variant="outlined" 
              fullWidth 
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
          )}
          onChange={(event, newValue) => {
            setSearchTerms(newValue);
          }}
        />
      </Paper>
      <div className="imageContainer">
        {filteredImages.map((image, index) => (
          <img 
            key={image.id} 
            src={`./images/${image.filename}`} 
            alt={image.filename} 
            className="imageItem" 
            onClick={() => handleOpenModal(index)}
          />
        ))}
      </div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <div className="modalContent">
          <IconButton onClick={prevImage} style={{ color: 'white' }}><ArrowBackIcon /></IconButton>
          <img 
            src={`./images/${filteredImages[currentImageIndex]?.filename}`} 
            alt={filteredImages[currentImageIndex]?.filename} 
            className="modalImage"
          />
          <IconButton onClick={nextImage} style={{ color: 'white' }}><ArrowForwardIcon /></IconButton>
        </div>
      </Modal>
    </div>
  );
}

export default Main;