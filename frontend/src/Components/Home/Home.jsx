import { useAuth } from "../../Auth/Auth"
import { useState, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import Nav from "../../Sections/Nav/Nav"
import Footer from "../../Sections/Footer/Footer";
import axios from "axios";
import localforage from "localforage";


function Home(){

    const use_auth = useAuth();
    const [currentUser, setCurrentUser] = useState();

    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState([]);

    const navigate = useNavigate();
   

    const logoutUser = (event) => {
        event.preventDefault();

        use_auth.logoutUser();
        


    }


    const getProducts = async () => {

        const user_token = Cookies.get("buysell_token");


        const products_feedback = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/get_all_products`)

        //console.log(products_feedback)

        if(products_feedback){
            return products_feedback.data;
        }
    }



    const addProductToCart = async (event, product) => {
        event.preventDefault();
        
        // adding to the cart array


        //set the cart 

        let current_cart = await localforage.getItem("buysell_cart");

        if(typeof current_cart === "undefined" || current_cart === null){
            current_cart = [];

            current_cart.push(product)
        }else{

            current_cart = JSON.parse(current_cart)

            current_cart.push(product);

        }

        localforage.setItem("buysell_cart", JSON.stringify(current_cart)).then(() => {
            setCart(current_cart)
            //add it to the state 
        })

      
        

    }

    const getCurrentCart = async () => {
        let current_cart = await localforage.getItem("buysell_cart");

        if(typeof current_cart === "undefined" || current_cart === null){
            return []
        }else{
            return JSON.parse(current_cart)
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


        // // get the current cart
        getCurrentCart().then((current_cart) => {
            // set the state 
            setCart(current_cart);
        })

    }, [])







    return (
        <>
        <Nav currentCart={cart} />
        <header className="bg-dark py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="text-center text-white">
                    <h1 className="display-4 fw-bolder">Shop in style</h1>
                    <p className="lead fw-normal text-white-50 mb-0">With this shop hompeage template</p>
                </div>
            </div>
        </header>
        <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">

            { products.map((product, index) => {

                //console.log(product);

                let product_image_path = `${import.meta.env.VITE_BACKEND_URL}` + product.product_image_path.split("public")[1]
                    
                    let vendor_path = "/vendor/" + product.user.username;

                    return (
                        <div className="col mb-5" key={index}>
                        <div className="card h-100">
                           
                            <img className="card-img-top" src={product_image_path} alt="..." />
                            
                            <div className="card-body p-4">
                                <div className="text-center">
                                    
                                    <h5 className="fw-bolder">{product.product_name}</h5>
                                    <h6><small>By <Link to={vendor_path}>{product.user.fullname}</Link></small></h6>
                                   
                                    NGN {product.product_price}
                                </div>
                            </div>
                            
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#" onClick={(event) => addProductToCart(event, product)}>Add to Card</a></div>
                            </div>
                        </div>
                    </div>

                    )


            })}


        </div>
        </div>

        </section>
<Footer />
        </>
   
    )


}


export default Home