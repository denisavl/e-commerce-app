import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/MainPage/HomePage"
import EyePage from "./Pages/EyePage/Eye"
import FacePage from "./Pages/FacePage/Face"
import LipsPage from "./Pages/LipsPage/Lips"
import NailsPage from "./Pages/NailsPage/Nails"

export default function App(){

    return (
        <Routes> 
            <Route path="/" element={<HomePage />}/>
            <Route path="/face" element={<FacePage />}/>
            <Route path="/eye" element={<EyePage />}/>
            <Route path="/lips" element={<LipsPage />}/>
            <Route path="/nails" element={<NailsPage />}/>
        </Routes>
    )
}