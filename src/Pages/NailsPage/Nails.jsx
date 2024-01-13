/* eslint-disable no-unused-vars */
import CreatePage from "../CreatePage/CreatePage";
import { fetchProducts } from "../../fetch";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { price2 } from "../Data";

export default function NailsPage() {
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

  const nailsProducts = useQuery({
    queryKey: ["face"],
    queryFn: () => fetchProducts(nailsProductTypes),
  });

  const brands = [...new Set(allProducts.map((product) => product.brand))].filter(
    (brand) => brand !== null
  );
  const properties = [
    ...new Set(allProducts.flatMap((product) => product.tag_list)),
  ];
  const priceIntervals = ["< 5", "5 - 9.99", "10 - 14.99", "> 15"];

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
  }}, [nailsProducts.data, nailsProducts.isSuccess])

  const showProducts = (filters) =>{ 
    let filteredResults = [...allProducts];

    if(filters.brand.length > 0){
      filteredResults = filteredResults.filter(product => (
        filters.brand.includes(product.brand)
      ))
    }

    if(filters.classification.length > 0){
      filteredResults = filteredResults.filter(product => (
        filters.classification.includes(product.product_type)
      ))
    }

    if(filters.property.length > 0){
      filteredResults = filteredResults.filter(product => {
        const productProperties = Array.isArray(product.tag_list)
        ? product.tag_list.map((prop) => prop.toLowerCase())
        : [];
        return filters.property.some(prop =>
          productProperties.includes(prop.toLowerCase()))
    })
    }

    if (filters.color.length > 0) {
      filteredResults = filteredResults.filter((product) => {
        const productColors = product.product_colors.map((color) =>
        color.colour_name ? color.colour_name.toLowerCase() : null
        );
        const filteredColor = productColors.filter( color => color !== null);
        const matches = filters.color.some((selectedColor) =>
        filteredColor.some((productColor) =>
            productColor.includes(selectedColor.toLowerCase())
          )
        );
        return matches;
      });
    }

    if(filters.price.length > 0){
      filteredResults = filteredResults.filter(product => {
      const prices = parseFloat(product.price);
      let intervals = price2.find(item => prices >= item.array[0] && prices <= item.array[1])
      return intervals && filters.price.includes(intervals.name);
      })
      
    }
    setFilteredProducts(filteredResults);
  }
 
  function handleFilter(filters, category)
  {
    let newFilter = {...selectedFilter};
    newFilter[category] = filters;

    showProducts(newFilter);
    setSelectedFilter(newFilter);
  }
  return (
    <CreatePage
      title={"Nails"}
      products={filteredProducts}
      brands={brands}
      classifications={["nail polish"]}
      colors={["rouge","cosmopolite","wonderland","pink","front row","massaï","lucky","bonheur","trianon","grège",]}
      properties={properties}
      prices={priceIntervals}
      handleFilter={(filters, category) => handleFilter(filters, category)}
    />
  );
}
