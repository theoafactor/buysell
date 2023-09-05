const mongodb = require("mongodb");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
require("dotenv").config();


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "theoafactor@gmail.com",
      pass: "kgeosqcptpbrctfl",
    }
  });



const client = new mongodb.MongoClient(process.env.DB_URL)

class User{

    constructor(){
        //
    }


    async registerUser(fullname, email, password){

        const check_feedback = await this.checkUserExists(email);

        if(check_feedback.code === "duplicate-account-error"){
            return check_feedback;
        }


        password = await bcrypt.hash(password, 8)
        // proceed with creating the account
        const register_feedback = await client.db(process.env.DB_NAME).collection("users").insertOne({
            fullname: fullname,
            email: email,
            password: password,
            is_verified: false
        });

        if(register_feedback){
            // send a verification email
            const user = {
                fullname: fullname,
                email: email
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


    async sendVerificationEmail(user){
        let fullname = user.fullname;
        let email = user.email;

        const info = await transporter.sendMail({
            from: '"BuySell 👻" <theoafactor@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Please verify your email address", // Subject line
            html: "<b>Hello world?</b>", // html body
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


    async checkUserExists(email){

        let find_feedback = await client.db(process.env.DB_NAME).collection("users").findOne({"email": email })

        if(find_feedback){
            // found .. the user exists
            return {
                message: "User with the email exists already",
                code: "duplicate-account-error"
            }
        }else{
            return {
                message: "User with the email does not exist",
                code: "not-exist"
            }

        }

    }



}

module.exports = User