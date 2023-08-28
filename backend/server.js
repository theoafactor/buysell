const express = require("express");
const jwt = require("jsonwebtoken");



const server = express();

server.use(express.json())

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



server.post("/user-profile", verifyToken, (request, response) => {

    //

} )



server.listen(1234, () => console.log("working on PORT 1234"))