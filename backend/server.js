const express = require("express");
const UserClass = require("./User/User");
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


server.post("/login", (request, response) => {
    let email = request.body.email;
    let password = request.body.password;

    let user = {
        email: email,
        password: password
    }
    

    jwt.sign({user}, "rtrrgbgbvfgrfbcvvvvbvbvbvgfft", (error, token) => {

        console.log(token);

        response.send({
            message: "User logged in",
            token: token
        })

    })
    

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