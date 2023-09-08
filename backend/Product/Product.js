const mongodb = require("mongodb");
require("dotenv").config();
const client = new mongodb.MongoClient(process.env.DB_URL)


class Product{

    constructor(){
        
    }


    /**
     * 
     * @param {object} product - takes product_name, product_description,
     * product_price and product_image_path 
     */
    async saveProductToDb(product){

        try{

            const save_feedback = await client.db(process.env.DB_NAME).collection("products").insertOne(product);

            if(save_feedback){
    
                return {
                    message: "Product saved successfully",
                    code: "success",
                    data: save_feedback
                }
    
            }else{
    
                return {
                    message: "Product could not be saved",
                    code: "error",
                    data: null
                }
    
    
            }

        }catch(error){

            return {
                message: "Product could not be saved",
                reason: error.message,
                code: "error",
                data: save_feedback
            }


        }


    }



}

module.exports = Product;