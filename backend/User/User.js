const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "theoafactor@gmail.com",
      pass: "ufkhlujblxbvvtje",
    }
  });



const client = new mongodb.MongoClient(process.env.DB_URL)

class User{

    constructor(){
        //
    }


    /**
     * Logs in the user internally by saving the token to the database
     * @param {*} email 
     * @param {*} token 
     */
    async loginUserInternally(email,token){

       try{

            const login_feedback = await client.db(process.env.DB_NAME).collection("users").updateOne({ email: email }, { $set: { token: token } });

            if(login_feedback.matchedCount === 1){
                return {
                    message: "User logged in with token",
                    code: "success", 
                    data: login_feedback
                }
            }else{
                return {
                    message: "User could not be logged in",
                    code: "error", 
                    data: null
                }
            }

       }catch(error){
        return {
            message: "User could not be logged in",
            reason: error.message,
            code: "error", 
            data: null
        }

       }

    }


    async registerUser(fullname, email, username, password){

        const check_feedback = await this.checkUserExists(email);

        if(check_feedback.code === "duplicate-account-error"){
            return check_feedback;
        }

        // check if the username
        const check_username_feedback = this.checkUsernameExists(username);

        if(check_username_feedback.code === "duplicate-account-error"){
            return check_username_feedback;
        }


        password = await bcrypt.hash(password, 8)
        // proceed with creating the account
        const register_feedback = await client.db(process.env.DB_NAME).collection("users").insertOne({
            fullname: fullname,
            email: email,
            username: username,
            password: password,
            is_verified: false
        });

        if(register_feedback){
            // send a verification email
            const user = {
                fullname: fullname,
                email: email,
                username: username
            }

            const send_email_feedback = await this.sendVerificationEmail(user)

            if(send_email_feedback.code === "success"){
                return {
                    message: 'Account created successfully',
                    code: "success"
                }
            }else{
                return send_email_feedback
            }
        }


    }


    async createToken(payload, expires = null){

        const token = jwt.sign(payload, "rtrrgbgbvfgrfbcvvvvbvbvbvgfft", { expiresIn: expires })

        return token;

    }


    async sendVerificationEmail(user){
        let fullname = user.fullname;
        let email = user.email;

        // create jwt 
        // - use the fullname and email to generate the token
        const payload = {
            fullname: fullname,
            email: email,
            extras: "/user/verification/email"
        }
        const token = await this.createToken(payload, "7m")

        console.log(token)

        // build the body of the email
        const verification_link = `${process.env.FRONTEND_URL}/users/verification?verificationkey=${token}`;
        const email_message = `
                            <h4>Please Verify Your Email ${fullname}!</h4>
                            <p>Hello there, please click on the link to verify your email: 
                            <a href='${verification_link}' target="_blank">Click here to verify</a>
                            </p>
                            <hr>
                            <p>With love from BuySell</p>
                            ;
        
        `

        const info = await transporter.sendMail({
            from: '"BuySell 👻" <theoafactor@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Please verify your email address", // Subject line
            html: email_message, // html body
          });


          if(info){
            return {
                message: "Verification sent",
                code: "success"
            }
          }else{
            return {
                message: "Could not send Verification email",
                code: "error"
            }

          }


    }


    async checkUsernameExists(username){

        username = username.toLowerCase();

        let find_feedback = await client.db(process.env.DB_NAME).collection("users").findOne({"username": username })

        if(find_feedback){
            // found .. the user exists
            return {
                message: "User with the username exists already",
                code: "duplicate-account-error",
                data: find_feedback
            }
        }else{
            return {
                message: "User with the username does not exist",
                code: "not-exist",
                data: null
            }

        }

    }


    async checkUserExists(email){

        let find_feedback = await client.db(process.env.DB_NAME).collection("users").findOne({"email": email })

        if(find_feedback){
            // found .. the user exists
            return {
                message: "User with the email exists already",
                code: "duplicate-account-error",
                data: find_feedback
            }
        }else{
            return {
                message: "User with the email does not exist",
                code: "not-exist",
                data: null
            }

        }

    }

    /**
     * Updates the user;s is_verified status
     * @param {*} email 
     * @param {*} update_to 
     */
    async updateUserVerificationStatus(email, update_to = false){

        const feedback = await client.db(process.env.DB_NAME).collection("users").updateOne({email: email}, {$set: {is_verified: update_to}})

        console.log("Updated feedback: ", feedback);


        if(feedback.matchedCount === 1){
            return {
                message: "User status updated",
                code: "success",
                data: feedback
            }
        }else{
            return {
                message: "User's status could not be updated",
                code: "error",
                data: null
            }

        }

    }


    async getUserById(user_id){

        const get_user_feedback = await client.db(process.env.DB_NAME).collection("users").findOne({ _id: new ObjectId(user_id) })

        if(get_user_feedback){

            return {
                message: "User retrieved by their id ",
                code: "success",
                data: get_user_feedback
            }

        }else{

            return {
                message: "User's data could not be retrieved",
                code: 'error',
                data: null

            }


        }


    }


    resolveUserId(mongoObjectId){
        
        const user_id = new ObjectId(mongoObjectId).toString();

        if(user_id){
            
            return user_id;

        }else{

            return null;

        }



    }


    /**
     * Sends an email 
     * @param {*} from_sender_email 
     * @param {*} to_recepient_email 
     * @param {*} title 
     * @param {*} message 
     */
    async sendEmail(from_sender_email, to_recepient_email, title, message){

        const info = await transporter.sendMail({
            from: `"BuySell 👻" <${from_sender_email}>`, // sender address
            to: to_recepient_email, // list of receivers
            subject: title, // Subject line
            html: message, // html body
          });


          if(info){

            return {
                message: "Email sent successfully!",
                code: "success",
                data: null
            }


          }
        
          return {
            message: "Email could not be sent!",
            code: "error",
            data: null
        }





    }




}

module.exports = User