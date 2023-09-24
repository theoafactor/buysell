const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();



class Chat{


    constructor(){
        this.client = new mongodb.MongoClient(process.env.DB_URL)
    }



    /**
     * 
     * @param {*} from_user_id 
     * @param {*} to_vendor_id 
     * @returns {object} token that represents the chat
     */
    async initiateChat(from_user_id, to_vendor_id){

        // create a token for this chat and store it 
        const payload = {
            from_user_id,
            to_vendor_id
        }

        const chat_token = jwt.sign(payload, process.env.JWT_SECRET_KEY)

        // create a chat object
        const chat = {
            chat_token: chat_token,
            from_user_id: from_user_id,
            to_vendor_id: to_vendor_id
        }

        // save this token in a database 
        try{
            const store_chat_object_feedback = await this.client.db(process.env.DB_NAME).collection("chats").insertOne(chat);

            if(store_chat_object_feedback){ 

                store_chat_object_feedback["chat"] = chat

                return {
                    message: "Chat was initialized successfully",
                    code: "success",
                    data: store_chat_object_feedback
                }
    
            }else{
                return {
                    message: "Chat could not be initialized",
                    code: "error",
                    data: null
                }

            }


        }catch(error){

            return {
                message: "Chat could not be initialized",
                reason: error.message,
                code: 'error',
                data: null
            }
            

        }




    }



}


module.exports = Chat;