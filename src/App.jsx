import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/MainPage/HomePage";
import EyesPage from "./Pages/EyesPage/Eyes";
import FacePage from "./Pages/FacePage/Face";
import LipsPage from "./Pages/LipsPage/Lips";
import NailsPage from "./Pages/NailsPage/Nails";
import LipstickPage from "./Pages/LipstickPage/Lipstick";
import ProductPage from "./Pages/ProductPage/ProductPage";
import Cart from "./Pages/CartPage/Cart";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchProducts, lipstickFetch } from "./fetch";

export default function App() {
  const useCategoryProducts = (category) => {
    const queryKey = [category];
    const queryOptions = useQuery({
      queryKey,
      queryFn: () => {
        switch (category) {
          case "eyes":
            return fetchProducts([
              "eyebrow",
              "eyeliner",
              "eyeshadow",
              "mascara",
            ]);
          case "face":
            return fetchProducts(["foundation", "blush", "bronzer"]);
          case "lips":
            return fetchProducts(["lip_liner", "lipstick"]);
          case "nails":
            return fetchProducts(["nail_polish"]);
          default:
            return Promise.reject(new Error("Invalid category"));
        }
      },
    });
    return queryOptions.data?.successfulResults || [];
  };

  const lipstickProduct = useQuery({
    queryKey: ["lipstick"],
    queryFn: () => lipstickFetch(),
  });

  const eyesProducts = useCategoryProducts("eyes");
  const faceProducts = useCategoryProducts("face");
  const lipstickProducts = lipstickProduct.data || [];
  const lipsProducts = useCategoryProducts("lips");
  const nailsProducts = useCategoryProducts("nails");

  const [count, setCount] = useState(1);
  const [cartProd, setCartProd] = useState([]);

  function decrementCount() {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  }

  function incrementCount() {
    if (count < 10) {
      setCount((prevCount) => prevCount + 1);
    }
  }

  function addToCart(product, quantity){
    const currentIndex = cartProd.findIndex(item => item.id === product.id);
    if(currentIndex !== -1){
      const updatedCartProd = [...cartProd];
      updatedCartProd[currentIndex] = {
        ...updatedCartProd[currentIndex],
        quantity: updatedCartProd[currentIndex].quantity + quantity
      }
      setCartProd(updatedCartProd)
    }
    else {
      setCartProd(prevCartProd => [
        ...prevCartProd,
        {
          ...product,
          quantity: quantity
        }
      ])
    }
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage cartProd={cartProd}/>} />
      <Route path="/face" element={<FacePage cartProd={cartProd}/>} />
      {faceProducts.map((result) =>
        result.data.map((product) => (
          <Route
            key={product.id}
            path={`/face/${product.id}`}
            element=
            {
            <ProductPage 
            productId={product.id} 
            category={"face"} 
            incrementCount={incrementCount} 
            decrementCount={decrementCount}
            count={count}
            cartProd={cartProd}
            addToCart={() => addToCart(product, count)}
            setCount={setCount}
            />
          }
          />
        ))
      )}
      <Route path="/eyes" element={<EyesPage />} />
      {eyesProducts.map((result) =>
        result.data.map((product) => (
          <Route
            key={product.id}
            path={`/eyes/${product.id}`}
            element={
            <ProductPage 
            productId={product.id} 
            category={"eyes"}
            incrementCount={incrementCount} 
            decrementCount={decrementCount}
            count={count} 
            cartProd={cartProd}
            addToCart={addToCart}
            />}
          />
        ))
      )}
      <Route path="/lips" element={<LipsPage />} />
      {lipsProducts.map((result) =>
        result.data.map((product) => (
          <Route
            key={product.id}
            path={`/lips/${product.id}`}
            element={
            <ProductPage 
            productId={product.id} 
            category={"lips"} 
            incrementCount={incrementCount} 
            decrementCount={decrementCount}
            count={count}
            cartProd={cartProd}
            addToCart={addToCart}
            />}
          />
        ))
      )}
      <Route path="/nails" element={<NailsPage />} />
      {nailsProducts.map((result) =>
        result.data.map((product) => (
          <Route
            key={product.id}
            path={`/nails/${product.id}`}
            element={
            <ProductPage 
            productId={product.id} 
            category={"nails"}
            incrementCount={incrementCount} 
            decrementCount={decrementCount}
            count={count} 
            cartProd={cartProd}
            addToCart={addToCart}
            />}
          />
        ))
      )}
      <Route path="/lipstick" element={<LipstickPage />} />
      {lipstickProducts.map((product) => (
        <Route
          key={product.id}
          path={`/lipstick/${product.id}`}
          element={
          <ProductPage 
          productId={product.id} 
          category={"lipstick"} 
          incrementCount={incrementCount} 
          decrementCount={decrementCount}
          count={count}
          cartProd={cartProd}
          addToCart={addToCart}
          />}
        />
      ))}
      <Route path="/cart" element={<Cart cartProd={cartProd}/>} />
    </Routes>
  );
}
