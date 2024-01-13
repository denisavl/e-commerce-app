import CreatePage from "../CreatePage/CreatePage";
import { fetchProducts } from "../../fetch";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { price1 } from "../Data";

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

  const eyesProducts = useQuery({
    queryKey: ["eyes"],
    queryFn: () => fetchProducts(eyesProductsTypes),
  });

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
      console.log(products);
    }
  }, [eyesProducts.data, eyesProducts.isSuccess]);

  const brands = [
    ...new Set(allProducts.map((product) => product.brand)),
  ].filter((brand) => brand !== null);
  const classification = ["eyebrow", "eyeliner", "eyeshadow", "mascara"];
  const colors = [
    "blue",
    "red",
    "green",
    "yellow",
    "brown",
    "purple",
    "gray",
    "orange",
    "teal",
    "pink",
  ];
  const properties = [
    ...new Set(allProducts.flatMap((product) => product.tag_list)),
  ];

  const showFilteredResults = (filters) => {
    let filteredResults = [...allProducts];
    if (filters.brand.length > 0) {
      filteredResults = filteredResults.filter((product) =>
        filters.brand.includes(product.brand)
      );
    }

    if (filters.classification.length > 0) {
      filteredResults = filteredResults.filter((product) =>
        filters.classification.includes(product.product_type)
      );
    }

    if (filters.color.length > 0) {
      filteredResults = filteredResults.filter((product) => {
        const productColors = product.product_colors.map((color) =>
          color.colour_name.toLowerCase()
        );
        const matches = filters.color.some((selectedColor) =>
          productColors.some((productColor) =>
            productColor.includes(selectedColor.toLowerCase())
          )
        );
        return matches;
      });
    }

    if (filters.property.length > 0) {
      filteredResults = filteredResults.filter((product) => {
        const productProperties = Array.isArray(product.tag_list)
          ? product.tag_list.map((prop) => prop.toLowerCase())
          : [];

        return filters.property.some((selectedProp) =>
          productProperties.includes(selectedProp.toLowerCase())
        );
      });
    }

    if (filters.price.length > 0) {
      filteredResults = filteredResults.filter((product) => {
        const productPrice = parseFloat(product.price);
        let intervals = price1.find(
          (item) =>
            productPrice >= item.array[0] && productPrice <= item.array[1]
        );

        return intervals && filters.price.includes(intervals.name);
      });
    }
    setFilteredProducts(filteredResults);
  };

  const handleFilter = (filters, category) => {
    // console.log(filters);
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
      classifications={classification}
      colors={colors}
      properties={properties}
      prices={["< 15", "15 - 29.99", "30 - 44.99", "45 - 59.99", "> 60"]}
      handleFilter={(filters, category) => handleFilter(filters, category)}
    />
  );
}
