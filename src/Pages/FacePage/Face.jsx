/* eslint-disable react/prop-types */
import CreatePage from '../CreatePage/CreatePage'
import { fetchProducts } from '../../fetch'
import { useQuery } from "@tanstack/react-query";
import { price1 } from "../Data";
import { useState, useEffect } from 'react';
import { ApplyFilters } from "../../ApplyFilters";

export default function FacePage({cartProd, showCart, toggleActive, handleDelete}){
    const faceProductTypes = ['foundation', 'blush', 'bronzer'];
    const [allProducts, setAllProducts] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState({
      brand: [],
      classification: [],
      color: [],
      price: [],
      property: [],
    });
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState('popularity');

    const faceProducts = useQuery({
        queryKey: ["face"],
        queryFn: () => fetchProducts(faceProductTypes),
      });

      const brands = [...new Set(allProducts.map(product => product.brand))].filter(brand => brand !== null);
      const properties = [...new Set(allProducts.flatMap(product => product.tag_list))] 

      const setDefaultOrder = (product) => {
        const defaultSortedProducts = [...product].sort((a, b) => b.id - a.id);
        setFilteredProducts(defaultSortedProducts);
        setAllProducts(defaultSortedProducts)
      }

    useEffect(() => {
      if (faceProducts.isSuccess) {
        const products = faceProducts.data.successfulResults.flatMap((result) =>
          result.data.map((product) => ({
            ...product,
            product_type: result.productType,
          }))
        );
        setAllProducts(products);
        setFilteredProducts(products);
        setDefaultOrder(products);
    }}, [faceProducts.data, faceProducts.isSuccess])

    const showFilteredResults = (filters) => {
      const filteredResults = ApplyFilters(allProducts, filters, price1)
      setFilteredProducts(filteredResults);
    };
   
    function handleFilter(filters, category)
    {
      let newFilter = {...selectedFilter};
      newFilter[category] = filters;

      showFilteredResults(newFilter);
      setSelectedFilter(newFilter);
    }

    return (
        <CreatePage 
        title={"Face"} 
        products={filteredProducts}
        brands={brands} 
        classifications={faceProductTypes}
        colors = {['white', 'red', 'blue', 'green', 'black', 'yellow', 'purple', 'pink', 'fair', 'medium', 'light']}
        properties={properties}
        prices={['< 15', '15 - 29.99', '30 - 44.99', '45 - 59.99', '> 60']}
        handleFilter={(filter, category) => handleFilter(filter, category)}
        sortedProducts={sortedProducts}
        setSortedProducts={setSortedProducts}
        setDefaultOrder={setDefaultOrder}
        category={'face'}
        cartProd={cartProd}
        showCart={showCart}
      toggleActive={toggleActive}
      handleDelete={handleDelete}
        />
    )
}