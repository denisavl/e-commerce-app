/* eslint-disable react/prop-types */
import Header from "./Header/Header";
import Poster from "./Poster/PosterHome";
import CardBestSeller from "./CardBestSeller/BestSellerCard";
import fetchCarousel from "../fetch";
import Brands from "./Brands/Brands";
import Footer from "./Footer/Footer";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import styles from "./homePage.module.css";

export default function HomePage() {
  const makeup = useQuery({
    queryKey: ["makeup"],
    queryFn: () => fetchCarousel(),
  });

  const [currentPage, setCurrentPage] = useState(0);
  const limitedData = makeup.data?.slice(0, 16) || [];
  const totalPages = 4;
  const startIndex = currentPage * 4;
  const endIndex = startIndex + 4;
  const productsToShow = [...limitedData.slice(startIndex, endIndex)];

  // if (makeup.isLoading) return <h1>Loading....</h1>;
  // if (makeup.isError) return <h1>Error loading data!!!</h1>;

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
    <>
      <Header />
      <Poster />
      <Brands />
      <h1 className={styles.headerSeller}>Best Seller</h1>
      <div className={styles.carouselContainer}>
        <div className={styles.container}>
          <div
            className={styles.containerBestSeller}>
            {productsToShow.map((item) => (
              <CardBestSeller key={item.id} product={item} />
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
    </>
  );
}
