import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import localforage from "localforage";


// 1. create context
const AuthContext = createContext();



// 2. Create provider
export const AuthProvider = ({children}) => {

    const [user, setUser] = useState({
        is_user_logged: false,
        user: null
    })

    const navigate = useNavigate();


    const getUserData = async() => {

       let user_data = await localforage.getItem("buysell_user");

       if(typeof user_data !== "undefined" && user_data !== null){
            console.log(user_data);
            return JSON.parse(user_data)
       }else{

            return null;

       }





    }


    const loginUser = async (user) => {

        console.log("Logs in from useAuth: ", user);

        setUser({
            is_user_logged: true,
            user: user
        });

        //set cookie
        Cookies.set("buysell_token", user.token)

        //save data to storage
        const user_to_save = {
            fullname: user.fullname,
            email: user.email,
            username: user.username,
            is_verified: user.is_verified
        }

        const save_user = await localforage.setItem("buysell_user", JSON.stringify(user_to_save))


        if(save_user){
            console.log("User logged in successfully!")

            // navigate to the user page
            navigate(`user/${user.username}`, {
                replace: true
            });

        }




    }


    const logoutUser = async () => {

        // delete the Cookies
        Cookies.remove("buysell_token");
        
        // delete from localforage
       localforage.removeItem("buysell_user").then(() => {
            setUser({
                is_user_logged: false,
                user: null
            })

            // redirect the user back to home page 
            navigate("/", {
                replace: true
            })

       })
        
       

        

       



    }


    useEffect(() => {

        // get the user from the storage
        const user_token = Cookies.get("buysell_token");

        if(user_token){
            // the user may still be logged in
            localforage.getItem("buysell_user").then((stored_user) => {

                if(typeof stored_user !== "undefined"){
                    // the user is logged in 
                    stored_user = JSON.parse(stored_user);
                    
                    setUser({
                        user: stored_user,
                        is_user_logged: true
                    })

                }else{
                    // the user is def not logged in
                    setUser({
                        user: null,
                        is_user_logged: false
                    })

                }


            })

        }else{
            // the user is not logged in
            setUser({
                user: null,
                is_user_logged: false
            })
        }


    }, [])
    


    return <AuthContext.Provider value={{ user, loginUser, logoutUser, getUserData }}>{children}</AuthContext.Provider>

}


// 3. Use the provider 
export const useAuth = () => {

    return useContext(AuthContext)

}



