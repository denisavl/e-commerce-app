/* eslint-disable react/prop-types */
import CreatePage from "../CreatePage/CreatePage";
import { useState } from "react";
import { ApplyFilters } from "../../ApplyFilters";
import { allPrices } from "../Data";
import { fetchAll } from "../../fetch";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Loading from "../LoadingPage/Loading";
export default function ShopAll({
  cartProd,
  showCart,
  toggleActive,
  handleDelete,
  setCartProd,
}) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState({
    brand: [],
    classification: [],
    property: [],
    color: [],
    price: [],
  });
  const [sortedProducts, setSortedProducts] = useState('popularity');

  const makeup = useQuery({
    queryKey: ["makeup"],
    queryFn: () => fetchAll(),
  });

  useEffect(() => {
    if (makeup.isSuccess && makeup.data) {
        const products = makeup.data;
        setFilteredProducts(products);
        setAllProducts(products);
        setDefaultOrder(products);
      }
    }
  ,[makeup.data, makeup.isSuccess]);

  if (makeup.isLoading) return <Loading />;

  const brands = [
    ...new Set(allProducts.map((product) => product.brand)),
  ].filter((brand) => brand !== null);
  const properties = [
    ...new Set(allProducts.flatMap((product) => product.tag_list)),
  ];

  const setDefaultOrder = (product) => {
    const defaultSortedProducts = [...product].sort((a, b) => b.id - a.id);
    setFilteredProducts(defaultSortedProducts);
    setAllProducts(defaultSortedProducts)
  }

  const showFilteredResults = (filters) => {
    const filteredResults = ApplyFilters(allProducts, filters, allPrices)
    setFilteredProducts(filteredResults);
  };

  const handleFilter = (filters, category) => {
    const newFilter = { ...selectedFilter };

    newFilter[category] = filters;

    showFilteredResults(newFilter);
    setSelectedFilter(newFilter);
  };

  return (
    <div>
      <CreatePage
        title={"Make up"}
        products={filteredProducts}
        brands={brands}
        classifications={["eyebrow",
        "eyeliner",
        "eyeshadow",
        "mascara",
        "foundation",
        "blush",
        "bronzer",
        "lip_liner",
        "lipstick",
        "nail_polish",]}
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
            "teal"
          ]}
        properties={properties}
        prices={["< 5", "5 - 9.99", "10 - 14.99", "15 - 29.99", "30 - 44.99", "45 - 59.99", "> 60"]}
        handleFilter={(filters, category) => handleFilter(filters, category)}
        sortedProducts={sortedProducts}
        setSortedProducts={setSortedProducts}
        setDefaultOrder={setDefaultOrder}
        category={"shop"}
        cartProd={cartProd}
        showCart={showCart}
        toggleActive={toggleActive}
        handleDelete={handleDelete}
        setCartProd={setCartProd}
      />
    </div>
  );
}
