/* eslint-disable no-unused-vars */
import CreatePage from '../CreatePage/CreatePage'
import { fetchProducts } from '../../fetch'
import { useQuery } from "@tanstack/react-query";
import { useState } from 'react';

export default function EyesPage(){
    const eyesProductsTypes = ["eyebrow", "eyeliner", "eyeshadow", "mascara"];

    const eyesProducts = useQuery({
        queryKey: ["eyes"],
        queryFn: () => fetchProducts(eyesProductsTypes),
      });
   
      const products = eyesProducts.data?.successfulResults.flatMap(result => (
        result.data.map(product => ({ ...product, product_type: result.productType }))
      )) || [];


      const brands = [...new Set(products.map(product => product.brand))].filter(brand => brand !== null);
      const classification = eyesProductsTypes;
      const colors = ['Blue', 'Red', 'Green', 'Yellow', 'Brown', 'Purple', 'Gray', 'Orange', 'Teal', 'Pink']
      const properties = [...new Set(products.flatMap(product => product.tag_list))]
      const priceIntervals = ['< 15', '15 - 29.99', '30 - 44.99', '45 - 59.99', '> 60']
            
    return (
        <CreatePage 
        title={"Eyes"} 
        products={products} 
        brands={brands} 
        classifications={classification}
        colors = {colors}
        properties={properties}
        prices={priceIntervals}
        />
    )
}