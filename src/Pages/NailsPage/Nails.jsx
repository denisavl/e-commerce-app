/* eslint-disable no-unused-vars */
import CreatePage from "../CreatePage/CreatePage";
import { fetchProducts } from "../../fetch";
import { useQuery } from "@tanstack/react-query";

export default function NailsPage() {
  const nailsProductTypes = ["nail_polish"];

  const nailsProducts = useQuery({
    queryKey: ["face"],
    queryFn: () => fetchProducts(nailsProductTypes),
  });

  const products =
    nailsProducts.data?.successfulResults.flatMap((result) =>
      result.data.map((product) => ({
        ...product,
        product_type: result.productType.replace(/_/g, " "),
      }))
    ) || [];

  const brands = [...new Set(products.map((product) => product.brand))].filter(
    (brand) => brand !== null
  );
  const classification = ["nail polish"];
  const colors = [
    "Rouge 999",
    "Cosmopolite",
    "Wonderland",
    "Fizz Pink",
    "Front Row",
    "Massaï",
    "Lucky",
    "Bonheur",
    "Trianon",
    "Grège",
  ];

  const properties = [
    ...new Set(products.flatMap((product) => product.tag_list)),
  ];
  const priceIntervals = ["< 5", "5 - 9.99", "10 - 14.99", "> 15"];
  return (
    <CreatePage
      title={"Nails"}
      products={products}
      brands={brands}
      classifications={classification}
      colors={colors}
      properties={properties}
      prices={priceIntervals}
    />
  );
}
