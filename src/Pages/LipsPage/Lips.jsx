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

    return (
        <CreatePage title={"Lips"} products={products}/>
    )
}