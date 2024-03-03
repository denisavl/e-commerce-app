/* eslint-disable react/prop-types */
import CreatePage from "../CreatePage/CreatePage";
import { fetchProducts } from "../../fetch";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { price2 } from "../Data";
import { ApplyFilters } from "../../ApplyFilters";
import Loading from "../LoadingPage/Loading";

export default function NailsPage({
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
  const nailsProductTypes = ["nail_polish"];
  const [allProducts, setAllProducts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState({
    brand: [],
    classification: [],
    color: [],
    price: [],
    property: [],
  });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState("popularity");

  const nailsProducts = useQuery({
    queryKey: ["face"],
    queryFn: () => fetchProducts(nailsProductTypes),
  });

  const brands = [
    ...new Set(allProducts.map((product) => product.brand)),
  ].filter((brand) => brand !== null);
  const properties = [
    ...new Set(allProducts.flatMap((product) => product.tag_list)),
  ];
  const priceIntervals = ["< 5", "5 - 9.99", "10 - 14.99", "> 15"];

  const setDefaultOrder = (product) => {
    const defaultSortedProducts = [...product].sort((a, b) => b.id - a.id);
    setFilteredProducts(defaultSortedProducts);
    setAllProducts(defaultSortedProducts);
  };

  useEffect(() => {
    if (nailsProducts.isSuccess) {
      const products = nailsProducts.data.successfulResults.flatMap((result) =>
        result.data.map((product) => ({
          ...product,
          product_type: result.productType.replace(/_/g, " "),
        }))
      );
      setAllProducts(products);
      setFilteredProducts(products);
      setDefaultOrder(products);
    }
  }, [nailsProducts.data, nailsProducts.isSuccess]);

  useEffect(() => {
    return () => {
      setFilteredProducts([]);
      setAllProducts([]);
      setSelectedFilter({
        brand: [],
        classification: [],
        property: [],
        color: [],
        price: [],
      });
      setSortedProducts("popularity");
    };
  }, []);

  if (nailsProducts.isLoading) return <Loading />;

  const showFilteredResults = (filters) => {
    const filteredResults = ApplyFilters(allProducts, filters, price2);
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
      title={"Nails products"}
      products={filteredProducts}
      brands={brands}
      classifications={["nail polish"]}
      colors={[
        "rouge",
        "cosmopolite",
        "wonderland",
        "pink",
        "front row",
        "massaï",
        "lucky",
        "bonheur",
        "trianon",
        "grège",
      ]}
      properties={properties}
      prices={priceIntervals}
      handleFilter={(filters, category) => handleFilter(filters, category)}
      sortedProducts={sortedProducts}
      setSortedProducts={setSortedProducts}
      setDefaultOrder={setDefaultOrder}
      category={"nails"}
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
  );
}
