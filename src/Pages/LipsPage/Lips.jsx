/* eslint-disable no-unused-vars */
import CreatePage from '../CreatePage/CreatePage'
import { fetchProducts } from '../../fetch'
import { useQuery } from "@tanstack/react-query";

export default function LipsPage(){
    const lipsProductTypes = ["lip_liner", "lipstick"];

    const lipsProducts = useQuery({
        queryKey: ["face"],
        queryFn: () => fetchProducts(lipsProductTypes),
      });
   
      const products = lipsProducts.data?.successfulResults.flatMap(result => (
        result.data.map(product => ({
          ...product,
          product_type: result.productType.replace(/_/g, ' ')
        }))
      )) || [];

      const brands = [...new Set(products.map(product => product.brand))].filter(brand => brand !== null);
      const classification = lipsProductTypes;
      const colors = ['Pink', 'Nude', 'Red', 'Berry', 'Brown', 'Peach', 'Plum', 'Coral', 'Natural', 'Orange'];
      const properties = [...new Set(products.flatMap(product => product.tag_list))]
      const priceIntervals = ['< 15', '15 - 29.99', '30 - 44.99', '45 - 59.99', '> 60']
    return (
        <CreatePage 
        title={"Lips"} 
        products={products} 
        brands={brands}
        classifications={classification}
        colors = {colors}
        properties={properties}
        prices={priceIntervals}
        />
    )
}