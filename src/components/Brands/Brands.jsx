/* eslint-disable react/prop-types */
import styles from '../Brands/brands.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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


function Arrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, background: "#b81d33", borderRadius: "50%" }}
      onClick={onClick}
    />
  );
}

function CarouselBrands() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        }
      }
    ]
  };
  return (
    <div className="slider-container" id={styles.slider}>
      <Slider {...settings} className={styles.container}>
        <div className={styles.contImg}>
          <img src={MaybellineImg} alt="" />
        </div>
        <div className={styles.contImg}>
        <img src={NyxImg} alt="" />
        </div>
        <div className={styles.contImg}>
        <img src={DiorImg} alt="" />
        </div>
        <div className={styles.contImg}>
        <img src={FentiImg} alt="" />
        </div>
        <div className={styles.contImg}>
        <img src={SalonImg} alt="" />
        </div>
        <div className={styles.contImg}>
        <img src={SmashboxImg} alt="" />
        </div>
        <div className={styles.contImg}>
        <img src={RevlonImg} alt="" />
        </div>
        <div className={styles.contImg}>
        <img src={MarcelleImg} alt="" />
        </div>
        <div className={styles.contImg}>
        <img src={CovergirlImg} alt="" />
        </div>
        <div className={styles.contImg}>
        <img src={MineralFusionImg} alt="" />
        </div>
      </Slider>
    </div>
  );
}

export default CarouselBrands;

// const Carousel = ({ images }) => {
//     const [startIndex, setStartIndex] = useState(0);
  
//     const handleNextPage = () => { 
//       setStartIndex((prevIndex) => (prevIndex + 1 < images.length ? prevIndex + 1 : 0));
//     };
  
//     const handlePrevPage = () => {
//       setStartIndex((prevIndex) => (prevIndex - 1 >= 0 ? prevIndex - 1 : images.length - 1));
//     };
  
//     const displayImages = () => {
//       const displayedImages = [];
//       for (let i = 0; i < 6; i++) {
//         const index = startIndex + i;
//         const imageIndex = index >= images.length ? index - images.length : index;
//         displayedImages.push(
//           <div key={index} className={styles.contImg}>
//             <img src={images[imageIndex]} alt={`brand logo ${index}`} />
//           </div>
//         );
//       }
//       return displayedImages;
//     };
  
//     return (
//       <div className={styles.containerBrands}>
//         {displayImages()}
//         <div className={styles.previous} onClick={handlePrevPage}>❮</div>
//         <div className={styles.next} onClick={handleNextPage}> ❯</div>
//       </div>
//     );
//   };
  
//   export default function Brands() {
//     const brandImages = [
//       MaybellineImg,
//       CovergirlImg,
//       DiorImg,
//       FentiImg,
//       MarcelleImg,
//       MineralFusionImg,
//       NyxImg,
//       RevlonImg,
//       SalonImg,
//       SmashboxImg,
//     ];
  
//     return <Carousel images={brandImages} />;
//   }
  