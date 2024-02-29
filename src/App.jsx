import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import EyesPage from "./Pages/EyesPage/Eyes";
import FacePage from "./Pages/FacePage/Face";
import LipsPage from "./Pages/LipsPage/Lips";
import NailsPage from "./Pages/NailsPage/Nails";
import LipstickPage from "./Pages/LipstickPage/Lipstick";
import ProductPage from "./Pages/ProductPage/ProductPage";
import AboutUs from "./Pages/AboutUsPage/AboutUs";
import ShopAll from "./Pages/ShopAll/ShopAll";
import Cart from "./Pages/CartPage/Cart";
import SearchResult from "./Pages/SearchResultPage/SearchResult";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { fetchProducts, lipstickFetch } from "./fetch";
import Loading from "./Pages/LoadingPage/Loading";

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
          case "shop":
            return fetchProducts([
              "eyebrow",
              "eyeliner",
              "eyeshadow",
              "mascara",
              "foundation",
              "blush",
              "bronzer",
              "lip_liner",
              "lipstick",
              "nail_polish",
            ]);
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
  const shopAll = useCategoryProducts("shop");

  const [count, setCount] = useState(1);
  const [cartProd, setCartProd] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [shade, setShade] = useState();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function toggleActive() {
    setShowCart(!showCart);
  }

  function decrementCount() {
    if (count > 1) {
      setCount((prevCount) => {
        const newCount = prevCount - 1;
        return newCount;
      });
    }
  }

  function incrementCount() {
    if (count < 100) {
      setCount((prevCount) => {
        const newCount = prevCount + 1;
        return newCount;
      });
    }
  }

  const location = useLocation();

  useEffect(() => {
    // Hide the cart preview when navigating to a new page
    setShowCart(false);
  }, [location]);

  function addToCart(product, quantity) {
    toggleActive();
    const currentIndex = cartProd.findIndex((item) => item.id === product.id);
    if (currentIndex !== -1) {
      const existingProduct = cartProd[currentIndex];
      if (existingProduct.color_prod === shade) {
        const updatedCartProd = [...cartProd];
        updatedCartProd[currentIndex] = {
          ...updatedCartProd[currentIndex],
          quantity: updatedCartProd[currentIndex].quantity + quantity,
          color_prod: shade,
        };
        setCartProd(updatedCartProd);
      } else {
        setCartProd((prevCartProd) => [
          ...prevCartProd,
          {
            ...product,
            quantity: quantity,
            color_prod: shade,
          },
        ]);
      }
    } else {
      setCartProd((prevCartProd) => [
        ...prevCartProd,
        {
          ...product,
          quantity: quantity,
          color_prod: shade,
        },
      ]);
    }
  }

  function handleDelete(productId, shade) {
    const newCartProd = cartProd.filter(
      (product) => productId !== product.id || product.color_prod !== shade
    );
    setCartProd(newCartProd);
  }

  function handleShade(color) {
    setShade(color.colour_name);
  }

  return (
    <div>
      {isLoading && <Loading />}
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              cartProd={cartProd}
              showCart={showCart}
              toggleActive={toggleActive}
              handleDelete={handleDelete}
              setCartProd={setCartProd}
              setResults={setResults}
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route
          path="/face"
          element={
            <FacePage
              cartProd={cartProd}
              showCart={showCart}
              toggleActive={toggleActive}
              handleDelete={handleDelete}
              setCartProd={setCartProd}
              setResults={setResults}
              setIsLoading={setIsLoading}
            />
          }
        />
        {faceProducts.map((result) =>
          result.data.map((product) => (
            <Route
              key={product.id}
              path={`/face/${product.id}`}
              element={
                <ProductPage
                  productId={product.id}
                  category={"face"}
                  incrementCount={incrementCount}
                  decrementCount={decrementCount}
                  count={count}
                  cartProd={cartProd}
                  addToCart={() => addToCart(product, count)}
                  showCart={showCart}
                  toggleActive={toggleActive}
                  handleDelete={handleDelete}
                  handleShade={handleShade}
                  shade={shade}
                  setCount={setCount}
                  setCartProd={setCartProd}
                  setShade={setShade}
                  setResults={setResults}
                  setIsLoading={setIsLoading}
                />
              }
            />
          ))
        )}
        <Route
          path="/eyes"
          element={
            <EyesPage
              cartProd={cartProd}
              showCart={showCart}
              toggleActive={toggleActive}
              handleDelete={handleDelete}
              setCartProd={setCartProd}
              setResults={setResults}
              setIsLoading={setIsLoading}
            />
          }
        />
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
                  addToCart={() => addToCart(product, count)}
                  showCart={showCart}
                  toggleActive={toggleActive}
                  handleDelete={handleDelete}
                  handleShade={handleShade}
                  shade={shade}
                  setCount={setCount}
                  setCartProd={setCartProd}
                  setShade={setShade}
                  setResults={setResults}
                  setIsLoading={setIsLoading}
                />
              }
            />
          ))
        )}
        <Route
          path="/lips"
          element={
            <LipsPage
              cartProd={cartProd}
              showCart={showCart}
              toggleActive={toggleActive}
              handleDelete={handleDelete}
              setCartProd={setCartProd}
              setResults={setResults}
              setIsLoading={setIsLoading}
            />
          }
        />
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
                  addToCart={() => addToCart(product, count)}
                  showCart={showCart}
                  toggleActive={toggleActive}
                  handleDelete={handleDelete}
                  handleShade={handleShade}
                  shade={shade}
                  setCount={setCount}
                  setCartProd={setCartProd}
                  setShade={setShade}
                  setResults={setResults}
                  setIsLoading={setIsLoading}
                />
              }
            />
          ))
        )}
        <Route
          path="/nails"
          element={
            <NailsPage
              cartProd={cartProd}
              showCart={showCart}
              toggleActive={toggleActive}
              handleDelete={handleDelete}
              setCartProd={setCartProd}
              setResults={setResults}
              setIsLoading={setIsLoading}
            />
          }
        />
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
                  addToCart={() => addToCart(product, count)}
                  showCart={showCart}
                  toggleActive={toggleActive}
                  handleDelete={handleDelete}
                  handleShade={handleShade}
                  shade={shade}
                  setCount={setCount}
                  setCartProd={setCartProd}
                  setShade={setShade}
                  setResults={setResults}
                  setIsLoading={setIsLoading}
                />
              }
            />
          ))
        )}
        <Route
          path="/lipstick"
          element={
            <LipstickPage
              cartProd={cartProd}
              showCart={showCart}
              toggleActive={toggleActive}
              handleDelete={handleDelete}
              setCartProd={setCartProd}
              setResults={setResults}
              setIsLoading={setIsLoading}
            />
          }
        />
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
                addToCart={() => addToCart(product, count)}
                showCart={showCart}
                toggleActive={toggleActive}
                handleDelete={handleDelete}
                handleShade={handleShade}
                shade={shade}
                setCount={setCount}
                setCartProd={setCartProd}
                setShade={setShade}
                setResults={setResults}
                setIsLoading={setIsLoading}
              />
            }
          />
        ))}
        <Route
          path="/cart"
          element={
            <Cart
              cartProd={cartProd}
              showCart={showCart}
              toggleActive={toggleActive}
              handleDelete={handleDelete}
              setCartProd={setCartProd}
              setResults={setResults}
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route
          path="/about"
          element={
            <AboutUs
              cartProd={cartProd}
              showCart={showCart}
              toggleActive={toggleActive}
              handleDelete={handleDelete}
              setCartProd={setCartProd}
              setResults={setResults}
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route
          path="/shop"
          element={
            <ShopAll
              cartProd={cartProd}
              showCart={showCart}
              toggleActive={toggleActive}
              handleDelete={handleDelete}
              setCartProd={setCartProd}
              setResults={setResults}
              setIsLoading={setIsLoading}
            />
          }
        />

        {shopAll.map((result) =>
          result.data.map((product) => (
            <Route
              key={product.id}
              path={`/shop/${product.id}`}
              element={
                <ProductPage
                  productId={product.id}
                  category={"shop"}
                  incrementCount={incrementCount}
                  decrementCount={decrementCount}
                  count={count}
                  cartProd={cartProd}
                  addToCart={() => addToCart(product, count)}
                  showCart={showCart}
                  toggleActive={toggleActive}
                  handleDelete={handleDelete}
                  handleShade={handleShade}
                  shade={shade}
                  setCount={setCount}
                  setCartProd={setCartProd}
                  setShade={setShade}
                  setResults={setResults}
                  setIsLoading={setIsLoading}
                />
              }
            />
          ))
        )}
        <Route
          path={"/search"}
          element={
            <SearchResult
              cartProd={cartProd}
              showCart={showCart}
              toggleActive={toggleActive}
              handleDelete={handleDelete}
              setCartProd={setCartProd}
              setResults={setResults}
              results={results}
              setIsLoading={setIsLoading}
            />
          }
        />
        {results.map((result) =>
           (
            <Route
              key={result.id}
              path={`/search/${result.id}`}
              element={
                <ProductPage
                  productId={result.id}
                  category={"search"}
                  incrementCount={incrementCount}
                  decrementCount={decrementCount}
                  count={count}
                  cartProd={cartProd}
                  addToCart={() => addToCart(result, count)}
                  showCart={showCart}
                  toggleActive={toggleActive}
                  handleDelete={handleDelete}
                  handleShade={handleShade}
                  shade={shade}
                  setCount={setCount}
                  setCartProd={setCartProd}
                  setShade={setShade}
                  setResults={setResults}
                  setIsLoading={setIsLoading}
                />
              }
            />
          )
        )}
      </Routes>
    </div>
  );
}
