import { Routes, Route } from "react-router-dom"
import Home from "./Components/Home/Home"
import Login from "./Components/Login/Login"
import Register from "./Components/Register/Register"
import User from "./Components/User/User"
import VerifyUser from "./Components/VerifyUser/VerifyUser";
import ResendVerification from "./Components/ResendVerification/ResendVerification"

import './css/styles.css'
import { AuthProvider } from "./Auth/Auth"
import AddProduct from "./Components/AddProduct/AddProduct"
import ViewProduct from "./Components/ViewProduct/ViewProduct"
import Notfound from "./Components/Notfound/Notfound"

function App(){


    return (

      <AuthProvider>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/user/:username" element={<User />}></Route>
            <Route path="/users/verification" element={<VerifyUser />}></Route>
            <Route path="/resend_verification_email" element={<ResendVerification />}></Route>
            <Route path="/user/products/add-product" element={<AddProduct />}></Route>
            <Route path="/user/products/view-products" element={<ViewProduct />}></Route>
            <Route path="*" element={<Notfound />}></Route>

        </Routes>
      </AuthProvider>


    )


}


export default App