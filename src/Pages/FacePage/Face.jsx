/* eslint-disable no-unused-vars */
import styles from '../FacePage/face.module.css'
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
      console.log(products);

    return (
        <CreatePage title={"Face"} products={products}/>
    )
}