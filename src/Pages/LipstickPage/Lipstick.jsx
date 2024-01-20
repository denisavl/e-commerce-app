/* eslint-disable no-unused-vars */
import CreatePage from "../CreatePage/CreatePage";
import { lipstickFetch } from "../../fetch";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { price1 } from "../Data";

export default function LipstickPage(){

    const [allProducts, setAllProducts] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState({
      brand: [],
      classification: [],
      color: [],
      price: [],
      property: [],
    });
    const [filteredProducts, setFilteredProducts] = useState([]);
    const lipstickProducts = useQuery({
        queryKey: ["lipstick"],
        queryFn: () => lipstickFetch(),
      });

    const brands = [...new Set(allProducts.map(product => product.brand))].filter(brand => brand !== null);
    const properties = [...new Set(allProducts.flatMap(product => product.tag_list))]

    useEffect(() => {
        
        const products = lipstickProducts.data || [];
          setAllProducts(products);
          setFilteredProducts(products);
      }, [lipstickProducts.data])
  
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
          let intervals = price1.find(item => prices >= item.array[0] && prices <= item.array[1])
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
        title={'Lipstick'} 
        products={filteredProducts} 
        brands={brands}
        colors = {['Pink', 'Nude', 'Red', 'Berry', 'Brown', 'Peach', 'Plum', 'Coral', 'Natural', 'Orange']}
        classifications={['lipstick']}
        properties={properties}
        prices={['< 15', '15 - 29.99', '30 - 44.99', '45 - 59.99', '> 60']}
        handleFilter={(filters, category) => handleFilter(filters, category)}
        category={'lipstick'}
        />
    )
}