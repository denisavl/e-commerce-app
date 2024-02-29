/* eslint-disable react/prop-types */
import CreatePage from "../CreatePage/CreatePage";
import { lipstickFetch } from "../../fetch";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { price1 } from "../Data";
import { ApplyFilters } from "../../ApplyFilters";
import Loading from "../LoadingPage/Loading";

export default function LipstickPage({
  cartProd,
  showCart,
  toggleActive,
  handleDelete,
  setCartProd,
  setResults,
  setIsLoading
}) {
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
  const lipstickProducts = useQuery({
    queryKey: ["lipstick"],
    queryFn: () => lipstickFetch(),
  });

  const brands = [
    ...new Set(allProducts.map((product) => product.brand)),
  ].filter((brand) => brand !== null);
  const properties = [
    ...new Set(allProducts.flatMap((product) => product.tag_list)),
  ];

  const setDefaultOrder = (product) => {
    const defaultSortedProducts = [...product].sort((a, b) => b.id - a.id);
    setFilteredProducts(defaultSortedProducts);
    setAllProducts(defaultSortedProducts);
  };

  useEffect(() => {
    const products = lipstickProducts.data || [];
    setAllProducts(products);
    setFilteredProducts(products);
    setDefaultOrder(products);
  }, [lipstickProducts.data]);

  if (lipstickProducts.isLoading) return <Loading />;

  const showFilteredResults = (filters) => {
    const filteredResults = ApplyFilters(allProducts, filters, price1);
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
      title={"Lipstick products"}
      products={filteredProducts}
      brands={brands}
      colors={[
        "Pink",
        "Nude",
        "Red",
        "Berry",
        "Brown",
        "Peach",
        "Plum",
        "Coral",
        "Natural",
        "Orange",
      ]}
      classifications={["lipstick"]}
      properties={properties}
      prices={["< 15", "15 - 29.99", "30 - 44.99", "45 - 59.99", "> 60"]}
      handleFilter={(filters, category) => handleFilter(filters, category)}
      sortedProducts={sortedProducts}
      setSortedProducts={setSortedProducts}
      setDefaultOrder={setDefaultOrder}
      category={"lipstick"}
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
