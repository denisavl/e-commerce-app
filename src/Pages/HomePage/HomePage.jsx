/* eslint-disable react/prop-types */
import Header from "../../components/Header/Header";
import Poster from "../../components/Poster/PosterHome";
import CardBestSeller from "../../components/CardBestSeller/BestSellerCard";
import { fetchCarousel } from "../../fetch";
import CarouselBrands from "../../components/Brands/Brands";
import Footer from "../../components/Footer/Footer";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import styles from "./homePage.module.css";
import Loading from "../LoadingPage/Loading";
import { Link } from "react-router-dom";

export default function HomePage({
  cartProd,
  showCart,
  toggleActive,
  handleDelete,
  setCartProd,
  setResults,
  setIsLoading,
  searchItem, 
  setSearchItem
}) {
  const makeup = useQuery({
    queryKey: ["makeup"],
    queryFn: () => fetchCarousel(),
  });

  useEffect(() => {
    return () => {
      setCurrentPage(0);
    };
  }, [makeup.data]);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerRow, setItemsPerRow] = useState(4);

  useEffect(() => {
    function getItemsPerRow() {
      if (window.innerWidth <= 500) {
        return 1;
      } else if (window.innerWidth <= 760) {
        return 2;
      } else if (window.innerWidth <= 1024) {
        return 3;
      } else if (window.innerWidth > 1024){
        return 4;
      }
    }
  
    function handleResize() {
      setItemsPerRow(getItemsPerRow());
    }
    handleResize();
  
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

 
  const limitedData = makeup.data?.slice(0, 16) || [];
  const totalPages = 4;
  const startIndex = currentPage * itemsPerRow;
  const endIndex = startIndex + itemsPerRow;
  const productsToShow = [...limitedData.slice(startIndex, endIndex)];

  if (makeup.isLoading) return <Loading />;
  if (makeup.isError) return <h1>Error loading data!!!</h1>;



  const navigateToPage = (pageNumber) => {
    if (pageNumber >= totalPages) {
      pageNumber = 0;
    }

    if (pageNumber < 0) {
      pageNumber = totalPages - 1;
    }
    setCurrentPage(pageNumber);
    
  };

  const handleNextPage = () => {
    navigateToPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    navigateToPage(currentPage - 1);
    
  };

  return (
    <div className={styles.homeContainer}>
      <Header
        cartProd={cartProd}
        showCart={showCart}
        toggleActive={toggleActive}
        handleDelete={handleDelete}
        setCartProd={setCartProd}
        setResults={setResults}
        setIsLoading={setIsLoading}
        searchItem={searchItem}
        setSearchItem={setSearchItem}
      />
      <Poster />
      <CarouselBrands />
      <h1 className={styles.headerSeller}>Best Seller</h1>
      <div className={styles.carouselContainer}>
        <div className={styles.container}>
          <div className={styles.containerBestSeller}>
            {productsToShow.map((item) => (
              <Link to={`face/${item.id}`} key={item.id}>
                <CardBestSeller product={item} />
              </Link>
            ))}
          </div>
          <div className={styles.previous} onClick={handlePreviousPage}>
            ❮
          </div>
          <div className={styles.next} onClick={handleNextPage}>
            ❯
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
