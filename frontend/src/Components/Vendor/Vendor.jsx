import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Auth/Auth";
import Nav from "../../Sections/Nav/Nav";

function Vendor(){

    const { username } = useParams();
    const [currentProducts, setCurrentProducts] = useState([]);

    const use_auth = useAuth();
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState();


    const initiateChatWithVendor = async () => {
        // which vendor?
        console.log("Vendor: ", currentProducts)
        if(currentProducts.length > 0){
            let firstProduct = currentProducts[0];

            const vendor_id = firstProduct.user_id;

            console.log("Current user: ", currentUser)

            const current_user_username = currentUser.username;

            const initiate_chat_feedback = await axios.post('http://localhost:1234/initiate_chat_with_vendor', {
                vendor_id: vendor_id,
                username: current_user_username 
            })


        }else{
            // this vendor has no product
            navigate("/", {
                replace: true
            })
        }

    }


    useEffect(() => {

        use_auth.getUserData().then((user_data) => {

          if(!user_data){
            // this user is not logged in
            setCurrentUser(null)
          }else{
            // this user is logged in
            setCurrentUser(user_data);
          }

            

        })

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/get_vendor_products?username=${username}`).then((feedback) => {

            console.log("Feedback: ", feedback);

            if(feedback.data.code === "success"){
                const vendor_products = feedback.data.data;

                // set the state 
                setCurrentProducts(vendor_products)
            }

        })




    }, [])

    return <>
        <div>
               <Nav />
            <div className="container mt-4 mb-4 p-3 d-flex justify-content-center"> 
            <div className="card p-4"> 
            <div className="image d-flex flex-column justify-content-center align-items-center"> <button className="btn btn-secondary"> 
            <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" /></button> 
            <span className="name mt-3">Vendor Page</span> 
            <span className="idd">Hello</span> 
            <div className="d-flex flex-row justify-content-center align-items-center gap-2"> 
            <span><i className="fa fa-copy"></i></span> 
            </div> <div className="d-flex flex-row justify-content-center align-items-center mt-3">     
            <span className="number">0 <span className="follow">Products</span></span> </div> 
    
            <div className=" d-flex mt-2"> 
                { currentUser == null || typeof currentUser == "undefined" ? <Link to="/login" className="btn btn-md btn-dark">Log in to Chat with Seller</Link> : <button className="btn1 btn-dark" onClick={initiateChatWithVendor}>Chat with Seller</button>} 
            </div> 
            
            <div className="text mt-3"> <span>Eleanor Pena is a creator of minimalistic x bold graphics and digital artwork.<br /><br/> Artist/ Creative Director by Day #NFT minting@ with FND night. </span> </div>
            
        
             <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center"> <span><i className="fa fa-twitter"></i></span> <span><i className="fa fa-facebook-f"></i></span> 
             <span><i className="fa fa-instagram"></i></span> <span><i className="fa fa-linkedin"></i></span> </div> <div className=" px-2 rounded mt-4 date "> 
             <span className="join"></span> </div> </div> </div>
        </div>

    </div>
    <div className="container">
        <h5>Products </h5>
    <div className="row mt-5">
                { currentProducts.map((product, index) => {

                    let product_image_path = product.product_image_path.split("public")[1]
                    product_image_path = `${import.meta.env.VITE_BACKEND_URL}/${product_image_path}`;
                    return <div className="col-md-4" key={index}>
                    <div className="card">
                        <div className="card-header">{product.product_name}</div>
                        <div className="card-body p-3">
                            <img src={product_image_path}/>
                        </div>
                    </div>
                    </div>


                })}



            </div>
    </div>
    </>



}

export default Vendor