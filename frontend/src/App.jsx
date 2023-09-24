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
import DefaultUser from "./Components/DefaultUser/Default"
import Vendor from "./Components/Vendor/Vendor"
import VendorChatWithCustomer from "./Components/VendorChatWithCustomer/VendorChatWithCustomer"
import CustomerChatWithVendor from "./Components/CustomerChatWithVendor/CustomerChatWithVendor"

import Pusher from "pusher"
import { useEffect  } from "react"

function App(){




  useEffect(() => {

  

  })

  




    return (

      <AuthProvider>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/user" element={<DefaultUser />}></Route>
            <Route path="/user/:username" element={<User />}></Route>
            <Route path="/vendor/:username" element={<Vendor />}></Route>
            <Route path="/users/verification" element={<VerifyUser />}></Route>
            <Route path="/resend_verification_email" element={<ResendVerification />}></Route>
            <Route path="/user/products/add-product" element={<AddProduct />}></Route>
            <Route path="/user/products/view-products" element={<ViewProduct />}></Route>
            <Route path="/chat/with/vendor" element={<CustomerChatWithVendor />}></Route>
            <Route path="/chat/with/customer" element={<VendorChatWithCustomer />}></Route>
            <Route path="*" element={<Notfound />}></Route>

        </Routes>
      </AuthProvider>


    )


}


export default App