/* eslint-disable no-unused-vars */
import CreatePage from "../CreatePage/CreatePage";
import { lipstickFetch } from "../../fetch";
import { useQuery } from "@tanstack/react-query";

export default function LipstickPage(){
    const lipstickProducts = useQuery({
        queryKey: ["lipstick"],
        queryFn: () => lipstickFetch(),
      });
    const products = lipstickProducts.data || [];
    console.log(products)

    const brands = [...new Set(products.map(product => product.brand))].filter(brand => brand !== null);
    const colors = ['Pink', 'Nude', 'Red', 'Berry', 'Brown', 'Peach', 'Plum', 'Coral', 'Natural', 'Orange'];
    const properties = [...new Set(products.flatMap(product => product.tag_list))]
    const classification = ['lipstick']
    const priceIntervals = ['< 15', '15 - 29.99', '30 - 44.99', '45 - 59.99', '> 60']

    return (
        <CreatePage  
        title={'Lipstick'} 
        products={products} 
        brands={brands}
        colors = {colors}
        classifications={classification}
        properties={properties}
        prices={priceIntervals}
        />
    )
}