import CreatePage from '../CreatePage/CreatePage'
import { fetchProducts } from '../../fetch'
import { useQuery } from "@tanstack/react-query";

export default function NailsPage(){
    const nailsProductTypes = ["nail_polish"];

    const nailsProducts = useQuery({
        queryKey: ["face"],
        queryFn: () => fetchProducts(nailsProductTypes),
      });
   
      const products = nailsProducts.data?.successfulResults.flatMap(result => (
        result.data.map(product => ({
          ...product,
          product_type: result.productType.replace(/_/g, ' ')
        }))
      )) || [];

    return (
        <CreatePage title={"Nails"} products={products}/>
    )
}