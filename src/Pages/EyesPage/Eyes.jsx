import CreatePage from '../CreatePage/CreatePage'
import { fetchProducts } from '../../fetch'
import { useQuery } from "@tanstack/react-query";

export default function EyePage(){
    const eyesProductsTypes = ["eyebrow", "eyeliner", "eyeshadow", "mascara"];

    const eyesProducts = useQuery({
        queryKey: ["eyes"],
        queryFn: () => fetchProducts(eyesProductsTypes),
      });
   
      const products = eyesProducts.data?.successfulResults.flatMap(result => (
        result.data.map(product => ({ ...product, product_type: result.productType }))
      )) || [];
    return (
        <CreatePage title={"Eyes"} products={products}/>
    )
}