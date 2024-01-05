/* eslint-disable react/prop-types */
import { useState } from 'react';
import styles from '../Brands/brands.module.css';

import MaybellineImg from '../../assets/brands/Maybelline.svg';
import CovergirlImg from '../../assets/brands/Covergirl.jpg';
import DiorImg from '../../assets/brands/Dior.svg';
import FentiImg from '../../assets/brands/Fenti.svg';
import MarcelleImg from '../../assets/brands/Marcelle.png';
import MineralFusionImg from '../../assets/brands/Mineral_Fusion.jpg';
import NyxImg from '../../assets/brands/Nyx.svg';
import RevlonImg from '../../assets/brands/Revlon.jpg';
import SalonImg from '../../assets/brands/Salon_Perfect.jpg';
import SmashboxImg from '../../assets/brands/smashbox.png';

const Carousel = ({ images }) => {
    const [startIndex, setStartIndex] = useState(0);
  
    const handleNextPage = () => { 
      setStartIndex((prevIndex) => (prevIndex + 1 < images.length ? prevIndex + 1 : 0));
    };
  
    const handlePrevPage = () => {
      setStartIndex((prevIndex) => (prevIndex - 1 >= 0 ? prevIndex - 1 : images.length - 1));
    };
  
    const displayImages = () => {
      const displayedImages = [];
      for (let i = 0; i < 6; i++) {
        const index = startIndex + i;
        const imageIndex = index >= images.length ? index - images.length : index;
        displayedImages.push(
          <div key={index} className={styles.contImg}>
            <img src={images[imageIndex]} alt={`brand logo ${index}`} />
          </div>
        );
      }
      return displayedImages;
    };
  
    return (
      <div className={styles.containerBrands}>
        {displayImages()}
        <div className={styles.previous} onClick={handlePrevPage}>❮</div>
        <div className={styles.next} onClick={handleNextPage}> ❯</div>
      </div>
    );
  };
  
  export default function Brands() {
    const brandImages = [
      MaybellineImg,
      CovergirlImg,
      DiorImg,
      FentiImg,
      MarcelleImg,
      MineralFusionImg,
      NyxImg,
      RevlonImg,
      SalonImg,
      SmashboxImg,
    ];
  
    return <Carousel images={brandImages} />;
  }
  