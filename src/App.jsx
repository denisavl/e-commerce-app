import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/MainPage/HomePage"
import EyesPage from "./Pages/EyesPage/Eyes"
import FacePage from "./Pages/FacePage/Face"
import LipsPage from "./Pages/LipsPage/Lips"
import NailsPage from "./Pages/NailsPage/Nails"
import LipstickPage from "./Pages/LipstickPage/Lipstick"
import ProductPage from "./Pages/ProductPage/ProductPage"

export default function App(){

    return (
        <Routes> 
            <Route path="/" element={<HomePage />}/>
            <Route path="/face" element={<FacePage />}/>
            <Route path="/eyes" element={<EyesPage />}/>
            <Route path="/lips" element={<LipsPage />}/>
            <Route path="/nails" element={<NailsPage />}/>
            <Route path="/lipstick" element={<LipstickPage />}/>
            <Route path="/product" element={<ProductPage />}/>
        </Routes>
    )
}