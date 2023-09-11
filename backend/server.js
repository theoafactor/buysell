const express = require("express");
const UserClass = require("./User/User");
const ProductClass = require("./Product/Product");
const bcrypt = require("bcrypt");
const multer  = require('multer')
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fs = require("fs");



const User = new UserClass;
const Product = new ProductClass;



const server = express();

server.use(express.json())
server.use(cors());
server.use(express.static("public"));


const verifyToken = async (request, response, next) => {

    const authorization = request.headers["authorization"];
    const token = authorization.split(" ")[1];

   try{
        const data = jwt.verify(token, "rtrrgbgbvfgrfbcvvvvbvbvbvgfft");

        request.token = token;
        request.email = data.user.email;

         // get id of the user with the email 
        const get_user_feedback = await User.checkUserExists(request.email);

        console.log(get_user_feedback);

        if(get_user_feedback.code === "duplicate-account-error"){
             const user_id = User.resolveUserId(get_user_feedback.data._id);
             request.user_id = user_id;
        }

   }catch(error){
     response.send({
            message: "Invalid token",
            reason: error.message,
            code: "authentication-error"
        })


   }

    next();
}



const multerMiddleware = multer({
    storage: multer.diskStorage({
        destination: function(request, file, destinationCallback){
    
    

            const user_id = request.user_id;
    
            if(fs.existsSync(`./public/products/${user_id}`) !== true){
                fs.mkdirSync(`./public/products/${user_id}`);
            }
    
            return destinationCallback(null, `./public/products/${user_id}`)
        },
    
        filename: function(request, file, filenameCallback){
    
            let name_of_file = file.originalname;
    
            return filenameCallback(null, `${Date.now()}_${name_of_file}`)
        }
    })
});


server.get("/", (request, response) => {

    response.send({
        message: "API works fine",
        code: "success"
    })

});


server.get("/user/get_products", verifyToken, async (request, response) => {
    const user_id  = request.user_id;

   const user_products = await Product.getUserProducts(user_id);

   console.log(user_products)

    if(user_products.code === "success"){
        response.send({
            message: "Products retrieved",
            code: "success",
            data: user_products.data
        })
    }else{

        response.send({
            message: "Products could not be retrieved",
            code: "error",
            data: null
        })

    }



})



server.post("/add_product", [verifyToken, multerMiddleware.single("product_image")], async (request, response) => {


    let product_name = request.body.product_name;
    let product_description = request.body.product_description;
    let product_price = request.body.product_price;

    let product_image_path = request.file.path;

    let user_email = request.email;
    let user_id = request.user_id

   


    const product_object = {
            product_name: product_name,
            product_description: product_description,
            product_price: product_price,
            product_image_path: product_image_path,
            user_id: user_id
    }

    const token = request.token;



    // save to database
    const save_product_feedback = await Product.saveProductToDb(product_object);

    if(save_product_feedback.code === "success"){
        response.send({
            message: "Product added successfully!",
            code: "success",
            data: save_product_feedback
        })
    }else{

        response.send({
            message: "Product could not be added!",
            code: "error",
            data: null
        })


    }


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

            jwt.sign({user}, "rtrrgbgbvfgrfbcvvvvbvbvbvgfft", async (error, token) => {

                console.log(token);

                //save the token to the user
                const login_feedback = await User.loginUserInternally(email, token);

                if(login_feedback.code === "success"){
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
                }else{

                    response.send({
                        message: "User could not be logged in ",
                        reason: login_feedback.data,
                        code: "login-error",
                        data: null
                    })


                }


        
               
        
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