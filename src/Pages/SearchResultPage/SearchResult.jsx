/* eslint-disable react/prop-types */
import CreatePage from "../CreatePage/CreatePage";
import { useEffect, useState } from "react";
import { allPrices } from "../Data";
import { ApplyFilters } from "../../ApplyFilters";

export default function SearchResult({
  cartProd,
  showCart,
  toggleActive,
  handleDelete,
  setCartProd,
  setResults,
  results,
  setIsLoading
}) {
  const [selectedFilter, setSelectedFilter] = useState({
    brand: [],
    classification: [],
    color: [],
    price: [],
    property: [],
  });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState("popularity");

  const brands = [
    ...new Set(results.map((product) => product.brand)),
  ].filter((brand) => brand !== null);
  const properties = [
    ...new Set(results.flatMap((product) => product.tag_list)),
  ];

  const setDefaultOrder = (product) => {
    const defaultSortedProducts = [...product].sort((a, b) => b.id - a.id);
    setFilteredProducts(defaultSortedProducts);
  };

  useEffect(() => {
    if (results) {
      setFilteredProducts(results);
      setDefaultOrder(results);
    }
  }, [results]);
  const showFilteredResults = (filters) => {
    const filteredResults = ApplyFilters(results, filters, allPrices);
    setFilteredProducts(filteredResults);
  };

  function handleFilter(filters, category) {
    let newFilter = { ...selectedFilter };
    newFilter[category] = filters;

    showFilteredResults(newFilter);
    setSelectedFilter(newFilter);
  }


  return (
    <CreatePage
      title={`Search results for: `}
      products={filteredProducts}
      brands={brands}
      classifications={[
        "eyebrow",
        "eyeliner",
        "eyeshadow",
        "mascara",
        "foundation",
        "blush",
        "bronzer",
        "lip liner",
        "lipstick",
        "nail polish",
      ]}
      colors={[
        "white",
        "red",
        "blue",
        "green",
        "black",
        "yellow",
        "purple",
        "pink",
        "fair",
        "medium",
        "light blue",
        "brown",
        "gray",
        "orange",
        "teal",
      ]}
      properties={properties}
      prices={[
        "< 5",
        "5 - 9.99",
        "10 - 14.99",
        "15 - 29.99",
        "30 - 44.99",
        "45 - 59.99",
        "> 60",
      ]}
      handleFilter={(filters, category) => handleFilter(filters, category)}
      sortedProducts={sortedProducts}
      setSortedProducts={setSortedProducts}
      setDefaultOrder={setDefaultOrder}
      category={"search"}
      cartProd={cartProd}
      showCart={showCart}
      toggleActive={toggleActive}
      handleDelete={handleDelete}
      setCartProd={setCartProd}
      setResults={setResults}
      setIsLoading={setIsLoading}
    />
  );
}
