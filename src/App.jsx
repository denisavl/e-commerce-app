import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/MainPage/HomePage"

export default function App(){

    return (
        <Routes> 
            <Route path="/" element={<HomePage />}/>
            {/* <Route path="/face" /> */}
        </Routes>
    )
}