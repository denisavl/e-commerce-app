import CreatePage from "../CreatePage/CreatePage";
import { fetchProducts } from "../../fetch";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { price1 } from "../Data";
import { ApplyFilters } from "../../ApplyFilters";

export default function EyesPage() {
  const eyesProductsTypes = ["eyebrow", "eyeliner", "eyeshadow", "mascara"];

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

  const eyesProducts = useQuery({
    queryKey: ["eyes"],
    queryFn: () => fetchProducts(eyesProductsTypes),
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
    setAllProducts(defaultSortedProducts)
  }

  useEffect(() => {
    if (eyesProducts.isSuccess) {
      const products = eyesProducts.data.successfulResults.flatMap((result) =>
        result.data.map((product) => ({
          ...product,
          product_type: result.productType,
        }))
      );
      setFilteredProducts(products);
      setAllProducts(products);
      setDefaultOrder(products);
    }
  }, [eyesProducts.data, eyesProducts.isSuccess]);

  const showFilteredResults = (filters) => {
    const filteredResults = ApplyFilters(allProducts, filters, price1)
    setFilteredProducts(filteredResults);
  };

  const handleFilter = (filters, category) => {
    const newFilter = { ...selectedFilter };

    newFilter[category] = filters;

    showFilteredResults(newFilter);
    setSelectedFilter(newFilter);
  };

  return (
    <CreatePage
      title={"Eyes"}
      products={filteredProducts}
      brands={brands}
      classifications={eyesProductsTypes}
      colors={["blue", "red", "green", "yellow", "brown", "purple", "gray", "orange", "teal", "pink"]}
      properties={properties}
      prices={["< 15", "15 - 29.99", "30 - 44.99", "45 - 59.99", "> 60"]}
      handleFilter={(filters, category) => handleFilter(filters, category)}
      sortedProducts={sortedProducts}
      setSortedProducts={setSortedProducts}
      setDefaultOrder={setDefaultOrder}
      category={'eyes'}
    />
  );
}
