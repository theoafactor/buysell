import { useAuth } from "../../Auth/Auth"
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Nav from "../../Sections/Nav/Nav"
import axios from "axios";

function AddProduct(){

    const use_auth = useAuth();
    const [currentUser, setCurrentUser] = useState();
    const navigate = useNavigate();
   

    const logoutUser = (event) => {
        event.preventDefault();

        use_auth.logoutUser();
        


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

    }, [])


     //Product functions
     const [product, setProduct] = useState({
         product_name: "",
         product_description: "",
         product_price: "",
         product_image: null,
         temporary_url: "",
         is_loading: false,
         form_errors: null,
         message: ""    
         
     });

    // proceesing the form
    const addProduct = async (event) => {
        event.preventDefault();

        const form_data = new FormData();

        form_data.append("product_name", product.product_name);
        form_data.append("product_description", product.product_description);
        form_data.append("product_price", product.product_price);
        form_data.append("product_image", product.product_image);

        const user_token = Cookies.get("buysell_token");

        setProduct({
            ... product,
            is_loading: true,
            message: "Please wait ..."
        })
        const add_product_feedback = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/add_product`, form_data, {
            headers: {
                "Authorization": `Bearer ${user_token}`
            }
        });


        if(add_product_feedback.data.code === "success"){
            console.log("Product added")
            setProduct({
                ... product,
                is_loading: false,
                message: "Product added"
            })
        }else{
            console.log("Product could not be added");
            setProduct({
                ... product,
                is_loading: false, 
                message: "Product could not be added"
            })
        }

       



    }


    const handleProductNameInput = (event) => {
       let product_name = event.target.value;

       setProduct({
        ... product,
        product_name: product_name
       })

    }

    const handleProductDescriptionInput = (event) => {
        let product_description = event.target.value;
 
        setProduct({
         ... product,
         product_description: product_description
        })
 
     }


    const handleProductPriceInput = (event) => {
        let product_price = event.target.value;
 
        setProduct({
         ... product,
         product_price: product_price
        })
 
     }


     const handleProductImageInput = (event) => {

        let product_image = event.target.files[0];

        const file = event.target.files.item(0);

        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);//read

        fileReader.onload = function(){

            const temporary_url = this.result;

            setProduct({
                ... product,
                temporary_url: <img src={temporary_url}></img>,
                product_image: product_image
            })

        }
 
        // setProduct({
        //  ... product,
        
        // })
 
     }





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
            <span className="number">0 <span className="follow">Products</span></span> </div> 
            <div className="d-flex products-settings">
                <li><NavLink to="/user/products/view-products">View Products</NavLink></li>
            </div>
           
            
            <div className="mt-3">
                        {product.message}
                    <form className="form"  method="POST" onSubmit={addProduct} encType="multipart/form-data">
                        <div className="form-group">
                            <label>Product name</label>
                            <input type="text" name="product_name" value={product.product_name} onChange={handleProductNameInput} className="form-control"></input>
                        </div>

                        <div className="form-group mt-3">
                            <label>Product description</label>
                            <textarea className="form-control" onChange={handleProductDescriptionInput}>{product.product_description}</textarea>
                        </div>

                        <div className="form-group mt-3">
                            <label>Product price (N)</label>
                            <input type="number" value={product.product_price} onChange={handleProductPriceInput} min="0" className="form-control"></input>
                        </div>

                        <div className="form-group mt-3">
                            <label>Upload Product Image </label>
                            <div style={{ marginTop: "10px", marginBottom: "20px"}}>{product.temporary_url}</div>
                            <input type="file" onChange={handleProductImageInput} className="form-control"></input>
                        </div>

                        <div className="form-group mt-3">
                            <button className="btn btn-dark form-control">Add Product</button>
                        </div>

                    </form>
                
            </div>
             <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center"> <span><i className="fa fa-twitter"></i></span> <span><i className="fa fa-facebook-f"></i></span> 
             <span><i className="fa fa-instagram"></i></span> <span><i className="fa fa-linkedin"></i></span> </div> <div className=" px-2 rounded mt-4 date "> 
             <span className="join"><a href="#" className="text-danger" onClick={logoutUser}>Log out</a></span> </div> </div> </div>
        </div>
        
        </>


}

export default AddProduct