import React from 'react';

const Files = () => {
  const imageFiles = ['image1.jpg', 'image2.jpg', 'image3.jpg']; // Nome dos arquivos de imagem

  return (
    <div>
      {imageFiles.map((file, index) => (
        <img key={index} src={`/images/${file}`} alt={file} />
      ))}
    </div>
  );
};

export default Files;