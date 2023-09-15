import { useAuth } from "../../Auth/Auth"
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Nav from "../../Sections/Nav/Nav"
import axios from "axios";

function ViewProduct(){

    const use_auth = useAuth();
    const [currentUser, setCurrentUser] = useState();

    const [products, setProducts] = useState([]);

    const navigate = useNavigate();
   

    const logoutUser = (event) => {
        event.preventDefault();

        use_auth.logoutUser();
        


    }

    const getProducts = async () => {

        const user_token = Cookies.get("buysell_token");
        const products_feedback = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/get_products`, {
            headers: {
                "Authorization": `Bearer ${user_token}`
            }
        })

        if(products_feedback){
            return products_feedback.data;
        }
    }


    useEffect( () => {

        use_auth.getUserData().then((user_data) => {

            console.log(user_data)

            if(user_data !== null){
                setCurrentUser(user_data)

            }else{

                navigate("/", {
                    replace: true
                })

            }
        })

        

        // get the products 
        getProducts().then((stored_products) => {
            setProducts(stored_products.data)
        })

    }, [])


    return <>
    <Nav />
 <div className="container mt-4 mb-4 p-3 d-flex justify-content-center"> 
 <div className="card p-4"> 
 <div className="image d-flex flex-column justify-content-center align-items-center"> 
 <h5>Add Product</h5>

 <span className="name mt-3">Hello {typeof currentUser !== "undefined" ? currentUser.fullname : "" }</span> 
 <span className="idd">{ typeof currentUser !== "undefined" ? currentUser.email : ""}</span> 
 <div className="d-flex flex-row justify-content-center align-items-center gap-2"> 
 <span><i className="fa fa-copy"></i></span> 
 </div> <div className="d-flex flex-row justify-content-center align-items-center mt-3">     
 <span className="number">{typeof products !== "undefined" ? products.length : "0"  } <span className="follow">Products</span></span> </div> 
 <div className="d-flex products-settings">
     <li><NavLink to="/user">Go back</NavLink></li>
 </div>

 
 <div className="mt-3">
           
       <div className="mt-3">
            <table className="table table-responsive table-stripped table-hover">
                <thead>
                    <th></th>
                    <th>Product name</th>
                    <th>SKU</th>
                    <th>Product description</th>
                    <th></th>
                </thead>
                <tbody>
                    { products.map((product, index) => {

                        let product_image_path = product.product_image_path;
                        product_image_path = `${import.meta.env.VITE_BACKEND_URL}${product_image_path.split("public")[1]}`;

                        return (
                            <tr key={index}>
                                <td><img className="image image-fluid" src={product_image_path} width="60px"/></td>
                                <td>{product.product_name}</td>
                                <td>12345</td>
                                <td>{product.product_description}</td>
                                <td><a href="">Manage Product</a></td>
                            </tr>
                        )

                    })}


                </tbody>
            </table>

       </div>

     
 </div>
  <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center"> <span><i className="fa fa-twitter"></i></span> <span><i className="fa fa-facebook-f"></i></span> 
  <span><i className="fa fa-instagram"></i></span> <span><i className="fa fa-linkedin"></i></span> </div> <div className=" px-2 rounded mt-4 date "> 
  <span className="join"><a href="#" className="text-danger" onClick={logoutUser}>Log out</a></span> </div> </div> </div>
</div>

</>


}

export default ViewProduct;