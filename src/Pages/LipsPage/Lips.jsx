/* eslint-disable no-unused-vars */
import CreatePage from '../CreatePage/CreatePage'
import { fetchProducts } from '../../fetch'
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from 'react';
import { price1 } from '../Data';
import {ApplyFilters} from '../../ApplyFilters'

export default function LipsPage(){
    const lipsProductTypes = ["lip_liner", "lipstick"];
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

    const lipsProducts = useQuery({
        queryKey: ["face"],
        queryFn: () => fetchProducts(lipsProductTypes),
      });
   

      const brands = [...new Set(allProducts.map(product => product.brand))].filter(brand => brand !== null);
      const properties = [...new Set(allProducts.flatMap(product => product.tag_list))]

      const setDefaultOrder = (product) => {
        const defaultSortedProducts = [...product].sort((a, b) => b.id - a.id);
        setFilteredProducts(defaultSortedProducts);
        setAllProducts(defaultSortedProducts)
      }

    useEffect(() => {
      if (lipsProducts.isSuccess) {
        const products = lipsProducts.data.successfulResults.flatMap((result) =>
          result.data.map((product) => ({
            ...product,
            product_type: result.productType.replace(/_/g, " "),
          }))
        );
        setAllProducts(products);
        setFilteredProducts(products);
        setDefaultOrder(products);
    }}, [lipsProducts.data, lipsProducts.isSuccess])

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
        title={"Lips"} 
        products={filteredProducts} 
        brands={brands}
        classifications={["lip liner", "lipstick"]}
        colors = {['Pink', 'Nude', 'Red', 'Berry', 'Brown', 'Peach', 'Plum', 'Coral', 'Natural', 'Orange']}
        properties={properties}
        prices={['< 15', '15 - 29.99', '30 - 44.99', '45 - 59.99', '> 60']}
        handleFilter={(filters, category) => handleFilter(filters, category)}
        sortedProducts={sortedProducts}
      setSortedProducts={setSortedProducts}
      setDefaultOrder={setDefaultOrder}
        category={'lips'}
        />
    )
}