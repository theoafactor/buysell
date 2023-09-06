import { createContext, useContext, useState } from "react";
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
            is_verified: user.is_verified
        }

        const save_user = await localforage.setItem("buysell_user", JSON.stringify(user_to_save))


        if(save_user){
            console.log("User logged in successfully!")

        }







    }


    const logoutUser = () => {

        setUser({
            is_user_logged: false,
            user: null
        })

    }
    


    return <AuthContext.Provider value={{ user, loginUser, logoutUser }}>{children}</AuthContext.Provider>

}


// 3. Use the provider 
export const useAuth = () => {

    return useContext(AuthContext)

}



