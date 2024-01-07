import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/MainPage/HomePage"
import EyePage from "./Pages/EyesPage/Eyes"
import FacePage from "./Pages/FacePage/Face"
import LipsPage from "./Pages/LipsPage/Lips"
import NailsPage from "./Pages/NailsPage/Nails"

export default function App(){

    return (
        <Routes> 
            <Route path="/" element={<HomePage />}/>
            <Route path="/face" element={<FacePage />}/>
            <Route path="/eyes" element={<EyePage />}/>
            <Route path="/lips" element={<LipsPage />}/>
            <Route path="/nails" element={<NailsPage />}/>
        </Routes>
    )
}