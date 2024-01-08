import CreatePage from "../CreatePage/CreatePage";
import { lipstickFetch } from "../../fetch";
import { useQuery } from "@tanstack/react-query";

export default function LipstickPage(){
    const lipstickProducts = useQuery({
        queryKey: ["lipstick"],
        queryFn: () => lipstickFetch(),
      });
    const products = lipstickProducts.data || [];
    console.log(products);
    return (
        <CreatePage  title={'Lipstick'} products={products}/>
    )
}