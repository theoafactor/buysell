import { useAuth } from "../../Auth/Auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function DefaultUser(){


    const use_auth = useAuth();


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

                navigate(`/user/${user_data.username}`, {
                    replace: true
                })
               

              
            }else{

                navigate("/", {
                    replace: true
                })

            }

            

        })


    }, [])


}


export default DefaultUser;