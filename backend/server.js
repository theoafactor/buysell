const express = require("express");
const UserClass = require("./User/User");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");


const User = new UserClass;



const server = express();

server.use(express.json())
server.use(cors());

const verifyToken = () => {

}

server.get("/", (request, response) => {

    response.send({
        message: "API works fine",
        code: "success"
    })

});


server.post("/user/verification/resend_verification", async (request, response) => {

    let email = request.body.email;

    // check that this email exists
    const check_feedback = await User.checkUserExists(email);

    if(check_feedback.code === "not-exist"){
        response.status(404).send({
            message: "Invalid email address",
            code: "not-exist",
            data: {
                email: email
            }
        })
    }else{

        // the user exists, 
        console.log(check_feedback.data.fullname);

        const fullname = check_feedback.data.fullname;

        const user = {
            fullname: fullname,
            email: email
        }

        const verification_feedback = await User.sendVerificationEmail(user)

        if(verification_feedback.code === "success"){
            response.send({
                message: "verification email resent",
                code: "success",
                data: null
            })
        }else{
            response.send({
                message: "verification email could not be resent",
                code: "error",
                data: null
            })

        }

    }


})


server.post("/user/verify-user-token/:token", async (request, response) => {

    const token_received = request.params.token;

    console.log(token_received);

    // check if this token is correct
    try {
        const data = jwt.verify(token_received, "rtrrgbgbvfgrfbcvvvvbvbvbvgfft")

          //update the user's is_verified status
            //User.updateUserVerificationStatus()
            console.log(data)
            email = data.email;

            // check if this email
            const check_email_feedback = await User.checkUserExists(email);

            if(check_email_feedback.code === "not-exist"){
                response.send({
                    message: "Invalid account",
                    code: "error",
                    data: null
                })
            }else{

                const feedback = await User.updateUserVerificationStatus(email, true);

                if(feedback.code === "error"){
                    response.send({
                        message: "We could not validate user account",
                        data: data,
                        code: "error"
                    })
                }else{

                    response.send({
                        message: "User validated",
                        data: data,
                        code: "success"
                    })

                }



              
            }

    }catch(error){
        console.log("Reason: ", error.message)
        response.send({
            message: "There was a problem verifying the token",
            reason: error.message,
            code: "token-error",
            data: null
        })

    }


})


server.post("/login", async (request, response) => {
    let email = request.body.email;
    let password = request.body.password;


    // check if the user exists
    const check_feedback = await User.checkUserExists(email);

    if(check_feedback.code === "not-exist"){
        
        response.send({
            message: "Invalid user account",
            code: 'error',
            data: null
        })

    }else{
        // the user exists
        console.log(check_feedback);
        const stored_password = check_feedback.data.password;
        const is_user_verified = check_feedback.data.is_verified;

        const password_check = await bcrypt.compare(password, stored_password);

        if(!password_check){
            // the password is not valid
            response.send({
                message: "Invalid user account. Password is invalid",
                code: 'error',
                data: null
            })
        }else if(!is_user_verified){

            response.send({
                message: "Account not verified. Click on the Verification link sent to your email address",
                code: 'not-verified',
                data: null
            })

        }
        
        else{

            

            let user = {
                email: email,
                password: password
            }

            jwt.sign({user}, "rtrrgbgbvfgrfbcvvvvbvbvbvgfft", (error, token) => {

                console.log(token);
        
                response.send({
                    message: "User logged in",
                    code: "login-success",
                    token: token,
                    data: {
                        fullname: check_feedback.data.fullname,
                        email: check_feedback.data.email,
                        is_verified: check_feedback.data.is_verified
                    }
                })
        
            })

        }



       

      
    }

   

    

   
    

})


server.post("/register-user", async (request, response) => {
    let fullname = request.body.fullname;
    let email  = request.body.email;
    let password = request.body.password;


    const feedback = await User.registerUser(fullname, email, password);

    if(feedback.code == "success"){
        response.send({
            message: feedback.message,
            code: "success",
            type: "create-account"
        })
    }else{

        response.send({
            message: 'Could not create account',
            reason: feedback.message,
            code: "error"
        })


    }




})



server.post("/user-profile", verifyToken, (request, response) => {

    //

} )



server.listen(1234, () => console.log("working on PORT 1234"))