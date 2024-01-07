// import { useQuery } from '@tanstack/react-query';
import axios from "axios";

async function fetchCarousel() {
  const response = await axios.get(
    "https://makeup-api.herokuapp.com/api/v1/products.json?product_category=cream&product_type=foundation"
  );
  const data = await response.data;
  return data;
}

  // const faceProducts = ["blush", "bronzer", "foundation"];
  //   const eyesProducts = ["eyebrow", "eyeliner", "eyeshadow", "mascara"];
  //   const lipsProducts = ["lip_liner", "lipstick"];
  //   const nailsProducts = ["nail_polish"];


const fetchProducts = async (productTypes) => {
  const requests = productTypes.map((type) =>
  axios.get(`https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${type}`)
);

const results = await Promise.allSettled(requests);

const successfulResults = [];
const errorResults = [];

results.forEach((result, index) => {
  if (result.status === 'fulfilled') {
    successfulResults.push({
      productType: productTypes[index],
      data: result.value.data,
    });
  } else {
    errorResults.push({
      productType: productTypes[index],
      error: result.reason,
    });
  }
});
return {successfulResults, errorResults };
};

export {fetchCarousel, fetchProducts}