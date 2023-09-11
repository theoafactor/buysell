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

    /**
     * Gets the products belonging to the user with the provided user_id
     * @param {*} user_id - the id of the user
     */
    async getUserProducts(user_id){

       try{
        const get_products = await client.db(process.env.DB_NAME).collection("products").find({ "user_id": user_id }).toArray()
        if(get_products){

            return {
                message: "Products retrieved",
                code: 'success',
                data: get_products
            }

        }else{

            return {
                message: "Products could not be retrieved",
                code: 'error',
                data: null
            }

        }
        }catch(error){

            return {
                message: "we could not retrieve products for this user",
                reason: error.message, 
                code: "error"
            }
       }

    }



}

module.exports = Product;