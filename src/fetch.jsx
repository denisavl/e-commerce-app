// import { useQuery } from '@tanstack/react-query';
import axios from "axios"

  export default async function fetchCarousel(){
    const response = await axios.get('https://makeup-api.herokuapp.com/api/v1/products.json?product_category=cream&product_type=foundation');
    const data = await response.data;
    return data;
  }