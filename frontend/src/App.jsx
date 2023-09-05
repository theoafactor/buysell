import { Routes, Route } from "react-router-dom"
import Home from "./Components/Home/Home"
import Login from "./Components/Login/Login"
import Register from "./Components/Register/Register"
import User from "./Components/User/User"

import './css/styles.css'

function App(){


    return (

        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/user" element={<User />}></Route>
        </Routes>


    )


}


export default App