import { NavLink, useNavigate, useParams } from "react-router-dom";
import Nav from "../../Sections/Nav/Nav"
import { useAuth } from "../../Auth/Auth";
import { useState, useEffect } from "react";

import "./User.css";
function User(){

    const use_auth = useAuth();

    const { username } = useParams()


    const navigate = useNavigate();
   
    const [currentUser, setCurrentUser] = useState();

    const logoutUser = (event) => {
        event.preventDefault();

        use_auth.logoutUser();
        


    }



    useEffect( () => {

        use_auth.getUserData().then((user_data) => {

            console.log("User data: ", user_data)

            if(user_data !== null){

                if(typeof username === "undefined"){}

                if(user_data.username === username){
                    setCurrentUser(user_data)
                }else{
                    navigate("/error/page-not-found", {
                        replace: true
                    })
                }

              
            }else{

                navigate("/", {
                    replace: true
                })

            }

            

        })


    }, [])


    return (
        <>
            <Nav />
            <div className="container mt-4 mb-4 p-3 d-flex justify-content-center"> 
            <div className="card p-4"> 
            <div className="image d-flex flex-column justify-content-center align-items-center"> <button className="btn btn-secondary"> 
            <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" /></button> 
            <span className="name mt-3">Hello {typeof currentUser !== "undefined" ? currentUser.fullname : "" }</span> 
            <span className="idd">{ typeof currentUser !== "undefined" ? currentUser.email : ""}</span> 
            <div className="d-flex flex-row justify-content-center align-items-center gap-2"> 
            <span><i className="fa fa-copy"></i></span> 
            </div> <div className="d-flex flex-row justify-content-center align-items-center mt-3">     
            <span className="number">0 <span className="follow">Products</span></span> </div> 
            <div className="d-flex products-settings">
                <li><NavLink to="/user/products/add-product">Add Product</NavLink></li>
                <li><NavLink to="/user/products/view-products">View Products</NavLink></li>
            </div>
            <div className=" d-flex mt-2"> <button className="btn1 btn-dark">Edit Profile</button> 
            </div> 
            
            <div className="text mt-3"> <span>Eleanor Pena is a creator of minimalistic x bold graphics and digital artwork.<br /><br/> Artist/ Creative Director by Day #NFT minting@ with FND night. </span> </div>
             <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center"> <span><i className="fa fa-twitter"></i></span> <span><i className="fa fa-facebook-f"></i></span> 
             <span><i className="fa fa-instagram"></i></span> <span><i className="fa fa-linkedin"></i></span> </div> <div className=" px-2 rounded mt-4 date "> 
             <span className="join"><a href="#" className="text-danger" onClick={logoutUser}>Log out</a></span> </div> </div> </div>
        </div>

        </>
    )



}


export default User