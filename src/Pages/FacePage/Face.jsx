/* eslint-disable no-unused-vars */
import CreatePage from '../CreatePage/CreatePage'
import { fetchProducts } from '../../fetch'
import { useQuery } from "@tanstack/react-query";

export default function FacePage(){
    const faceProductTypes = ['foundation', 'blush', 'bronzer'];

    const faceProducts = useQuery({
        queryKey: ["face"],
        queryFn: () => fetchProducts(faceProductTypes),
      });
   
      const products = faceProducts.data?.successfulResults.flatMap(result => (
        result.data.map(product => ({ ...product, product_type: result.productType }))
      )) || [];
      // console.log(products);

      const brands = [...new Set(products.map(product => product.brand))].filter(brand => brand !== null);
      const classification = faceProductTypes;
      const colors= ['White', 'Red', 'Blue', 'Green', 'Black', 'Yellow', 'Purple', 'Pink', 'Fair', 'Medium', 'Light']    
      const properties = [...new Set(products.flatMap(product => product.tag_list))]
      const priceIntervals = ['< 15', '15 - 29.99', '30 - 44.99', '45 - 59.99', '> 60']

    return (
        <CreatePage 
        title={"Face"} 
        products={products}
        brands={brands} 
        classifications={classification}
        colors = {colors}
        properties={properties}
        prices={priceIntervals}
        />
    )
}